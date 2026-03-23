<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;

class PayrollController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $payrolls = $user->payrolls()
            ->orderBy('period_end', 'desc')
            ->get()
            ->map(function ($payroll) {
                return [
                    'id' => $payroll->payroll_id,
                    'month' => Carbon::parse($payroll->period_end)->format('F Y'),
                    'type' => 'Full Month', // Or dynamic based on a column if added
                    'amount' => 'EGP ' . number_format($payroll->net_salary, 2),
                    'baseSalary' => 'EGP ' . number_format($payroll->base_salary, 2),
                    'bonuses' => 'EGP ' . number_format($payroll->bonuses, 2),
                    'deductions' => 'EGP ' . number_format($payroll->deductions, 2),
                    'date' => $payroll->period_end,
                ];
            });

        return response()->json($payrolls);
    }
}
