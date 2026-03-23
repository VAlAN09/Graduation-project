<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payroll;

class AdminPayrollController extends Controller
{
    public function index()
    {
        $payroll = Payroll::with('user')->orderBy('month', 'desc')->get();
        return response()->json($payroll);
    }
}
