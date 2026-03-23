<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LeaveRequest;
use App\Models\Alert;
use App\Models\LeaveBalance;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;



class LeaveController extends Controller
{

    public function store(Request $request)
{
    $request->validate([
        'leave_type' => 'required|string',
        'reason' => 'required|string',
        'start_date' => 'required|date',
        'end_date' => 'required|date|after_or_equal:start_date'
    ]);

    $user = $request->user();

    // حساب عدد الأيام
    $days = Carbon::parse($request->start_date)
            ->diffInDays(Carbon::parse($request->end_date)) + 1;

    // جلب رصيد الإجازات
    $balance = LeaveBalance::where('user_id', $user->user_id)->first();

    if (!$balance) {
        return response()->json([
            'message' => 'Leave balance not found'
        ], 400);
    }

    // التأكد إن نوع الإجازة موجود
    if (!isset($balance->{$request->leave_type})) {
        return response()->json([
            'message' => 'Invalid leave type'
        ], 400);
    }

    // التأكد من الرصيد
    if ($balance->{$request->leave_type} < $days) {
        return response()->json([
            'message' => 'Not enough leave balance'
        ], 400);
    }

    // إنشاء الطلب
    $leave = LeaveRequest::create([
        'user_id' => $user->user_id,
        'leave_type' => $request->leave_type,
        'reason' => $request->reason,
        'status' => 'pending',
        'start_date' => $request->start_date,
        'end_date' => $request->end_date
    ]);

    return response()->json([
        'message' => 'Leave request submitted',
        
    ]);
}


    public function supervisorLeaves(Request $request)
{

    $supervisor = $request->user();

    $department_id = $supervisor->department_id;

    $leaves = LeaveRequest::join('users', 'leave_requests.user_id', '=', 'users.user_id')
        ->where('users.department_id', $department_id)
        ->where('leave_requests.status', 'pending')
        ->select(
            'leave_requests.*',
            'users.first_name',
            'users.last_name'
        )
        ->get();

    return response()->json([
        'data' => $leaves
    ]);

}

public function approve($id)
{
    return DB::transaction(function () use ($id) {
        $leave = LeaveRequest::find($id);

        if (!$leave) {
            return response()->json(['message' => 'Leave request not found'], 404);
        }

        if ($leave->status === 'approved') {
             return response()->json(['message' => 'This request is already approved'], 400);
        }

        $leave->status = 'approved';
        $leave->save();

        // خصم الرصيد
        $start = \Carbon\Carbon::parse($leave->start_date);
        $end   = \Carbon\Carbon::parse($leave->end_date);
        $days = $start->diffInDays($end) + 1;

        $balance = LeaveBalance::where('user_id', $leave->user_id)
            ->where('year', \Carbon\Carbon::now()->year)
            ->first();

        if ($balance && isset($balance->{$leave->leave_type})) {
            $balance->{$leave->leave_type} -= $days;
            $balance->save();
        }


        
        Alert::create([
            'user_id' => $leave->user_id,
            'alert_type' => 'leave_approved',
            'content' => 'Your leave request has been approved'
        ]);


        $start = \Carbon\Carbon::parse($leave->start_date);
        $end   = \Carbon\Carbon::parse($leave->end_date);

        for ($date = $start->copy(); $date->lte($end); $date->addDay()) {
            
            \App\Models\Attendance::updateOrCreate(
                [
                    'user_id' => $leave->user_id,
                    'date' => $date->format('Y-m-d'),
                ],
                [
                    'status' => 'leave', 
                    'time_in' => null,
                    'time_out' => null,
                    'late_minutes' => 0,
                    'early_leave_minutes' => 0,
                    'overtime_minutes' => 0
                ]
            );
        }

        return response()->json(['message' => 'Leave approved']);
    });
}

public function reject($id)
{

    $leave = LeaveRequest::find($id);

    if (!$leave) {
        return response()->json([
            'message' => 'Leave request not found'
        ], 404);
    }

    $leave->status = 'rejected';
    $leave->save();

    // create alert
    Alert::create([
        'user_id' => $leave->user_id,
        'alert_type' => 'leave_rejected',
        'content' => 'Your leave request has been rejected'
    ]);


    return response()->json([
        'message' => 'Leave rejected',
        
    ]);
}

public function leaveHistory(Request $request)
{
    $user = $request->user();

    $currentYear = Carbon::now()->year;

    // leave requests history
    $leaves = LeaveRequest::where('user_id', $user->user_id)
        ->orderBy('start_date', 'desc')
        ->get()
        ->map(function ($leave) {

            $start = Carbon::parse($leave->start_date);
            $end = Carbon::parse($leave->end_date);

            return [
                'leave_type' => $leave->leave_type,
                'reason' => $leave->reason,
                'status' => $leave->status,
                'start_date' => $leave->start_date,
                'end_date' => $leave->end_date,
                'duration' => $start->diffInDays($end) + 1
            ];
        });

    // leave balance
    $balance = LeaveBalance::where('user_id', $user->user_id)
        ->where('year', $currentYear)
        ->first();

    return response()->json([
        'leave_balance' => [
            'year' => $currentYear,
            'annual' => $balance->annual ?? 0,
            'sick' => $balance->sick ?? 0,
            'casual' => $balance->casual ?? 0
        ],
        'leave_history' => $leaves
    ]);
}

}

