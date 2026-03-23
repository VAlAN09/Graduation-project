<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\LeaveBalance;
use App\Models\Payroll;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $today = Carbon::today()->toDateString();

        // 1. Today's Status (Attendance)
        $attendance = Attendance::where('user_id', $user->user_id)
            ->where('date', $today)
            ->first();

        $statusData = null;
        if ($attendance) {
            $statusData = [
                'checkIn' => $attendance->time_in,
                'checkOut' => $attendance->time_out,
                'status' => $attendance->status,
            ];
        }

        // 2. Leave Balances
        $balances = LeaveBalance::where('user_id', $user->user_id)
            ->where('year', Carbon::now()->year)
            ->first();

        $leaveData = null;
        if ($balances) {
            $leaveData = [
                'casual' => ['used' => 0, 'total' => $balances->casual], // we need to calculate used from requests
                'sick' => ['used' => 0, 'total' => $balances->sick],
                'vacation' => ['used' => 0, 'total' => $balances->annual],
            ];
            
            // Calculate used leaves
            $usedLeaves = $user->leaveRequests()
                ->where('status', 'approved')
                ->whereYear('start_date', Carbon::now()->year)
                ->get();
            
            foreach ($usedLeaves as $request) {
                $days = Carbon::parse($request->start_date)->diffInDays(Carbon::parse($request->end_date)) + 1;
                if (stripos($request->leave_type, 'casual') !== false) {
                    $leaveData['casual']['used'] += $days;
                } elseif (stripos($request->leave_type, 'sick') !== false) {
                    $leaveData['sick']['used'] += $days;
                } else {
                    $leaveData['vacation']['used'] += $days;
                }
            }
        }

        // 3. Latest Payslip
        $latestPayroll = Payroll::where('user_id', $user->user_id)
            ->orderBy('period_end', 'desc')
            ->first();

        $payslipData = null;
        if ($latestPayroll) {
            $payslipData = [
                'month' => Carbon::parse($latestPayroll->period_end)->format('F Y'),
                'type' => 'Full Month',
                'amount' => 'EGP ' . number_format($latestPayroll->net_salary, 2),
            ];
        }

        return response()->json([
            'statusData' => $statusData,
            'leaveBalances' => $leaveData,
            'latestPayslip' => $payslipData,
        ]);
    }
}
