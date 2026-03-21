<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;


class AttendanceController extends Controller
{
    public function scan(Request $request)
    {
        $request->validate([
            'token' => 'required'
        ]);

        $token = $request->token;

        if (!Cache::has('qr_token_' . $token)) {
            return response()->json([
                'message' => 'Invalid or expired QR'
            ], 401);
        }

        $user = $request->user();
        $today = now()->toDateString();
        $now = Carbon::now();

        $attendance = Attendance::where('user_id', $user->user_id)
            ->where('date', $today)
            ->first();

        // =========================
        // CHECK IN
        // =========================
        if (!$attendance) {

            $officialStart = Carbon::createFromTime(9, 0, 0); // 9:00 AM
            $lateMinutes = 0;

            if ($now->gt($officialStart)) {
                $lateMinutes = $officialStart->diffInMinutes($now);
            }

            $attendance = Attendance::create([
                'user_id' => $user->user_id,
                //'setting_id' => 1, // عدلها حسب نظامك
                'date' => $today,
                'time_in' => $now->toTimeString(),
                'status' => $lateMinutes > 0 ? 'late' : 'present',
                'late_minutes' => $lateMinutes,
                'early_leave_minutes' => 0,
                'overtime_minutes' => 0
            ]);

            Cache::forget('qr_token_' . $token);

            return response()->json([
                'message' => 'Checked In',
                'data' => $attendance
            ]);
        }

        // =========================
        // CHECK OUT
        // =========================
        if (!$attendance->time_out) {

            $officialEnd = Carbon::createFromTime(17, 0, 0); // 5:00 PM
            $earlyLeave = 0;
            $overtime = 0;

            if ($now->lt($officialEnd)) {
                $earlyLeave = $now->diffInMinutes($officialEnd);
            }

            if ($now->gt($officialEnd)) {
                $overtime = $officialEnd->diffInMinutes($now);
            }

            $attendance->update([
                'time_out' => $now->toTimeString(),
                'early_leave_minutes' => $earlyLeave,
                'overtime_minutes' => $overtime
            ]);

            Cache::forget('qr_token_' . $token);

            return response()->json([
                'message' => 'Checked Out',
                'data' => $attendance
            ]);
        }

        return response()->json([
            'message' => 'Attendance already completed'
        ], 400);
    }

    public function history(Request $request)
{
    $user = $request->user();

    $start = Carbon::now()->startOfMonth();
    $end = Carbon::now()->endOfMonth();

    $records = Attendance::where('user_id', $user->user_id)
        ->whereBetween('date', [$start, $end])
        ->orderBy('date')
        ->get()
        ->map(function ($item) {

            return [
                'date' => $item->date,
                'day' => Carbon::parse($item->date)->format('l'),
                'in_time' => $item->time_in,
                'out_time' => $item->time_out,
                'status' => $item->status
            ];
        });

    // counts
    $present = Attendance::where('user_id', $user->user_id)
        ->whereBetween('date', [$start, $end])
        ->where('status', 'present')
        ->count();

    $absent = Attendance::where('user_id', $user->user_id)
        ->whereBetween('date', [$start, $end])
        ->where('status', 'absent')
        ->count();

    $leave = Attendance::where('user_id', $user->user_id)
        ->whereBetween('date', [$start, $end])
        ->where('status', 'leave')
        ->count();

    return response()->json([
        'records' => $records,
        'summary' => [
            'present_days' => $present,
            'absent_days' => $absent,
            'leave_days' => $leave
        ]
    ]);
}
}