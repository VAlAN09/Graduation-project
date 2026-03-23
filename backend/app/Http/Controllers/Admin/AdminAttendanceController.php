<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendance;

class AdminAttendanceController extends Controller
{
    public function index()
    {
        $attendance = Attendance::with('user')->orderBy('date', 'desc')->get();
        return response()->json($attendance);
    }
}
