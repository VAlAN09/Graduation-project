<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LeaveBalance;
use Carbon\Carbon;

class BalanceController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,user_id',
            'leave_type' => 'required|in:annual,sick,casual',
            'amount' => 'required|numeric'
        ]);

        $year = Carbon::now()->year;

        $balance = LeaveBalance::updateOrCreate(
            ['user_id' => $request->user_id, 'year' => $year],
            [$request->leave_type => $request->amount]
        );

        return response()->json([
            'message' => 'Balance updated successfully',
            'data' => $balance
        ]);
    }
}
