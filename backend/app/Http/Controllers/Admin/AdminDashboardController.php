<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\LeaveRequest;
use Carbon\Carbon;
use App\Models\Attendance;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today()->format('Y-m-d');
        
        $totalEmployees = User::count();
        $onLeaveToday = LeaveRequest::where('status', 'approved')
            ->whereDate('start_date', '<=', $today)
            ->whereDate('end_date', '>=', $today)
            ->count();
            
        // Mocking some data for charts/stats where tables might be empty or missing
        $openPositions = DB::table('vacancies')->count(); 
        $performanceAvg = "84%"; // Placeholder logic
        
        // Attendance trends (last 7 days)
        $attendanceTrends = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $presentCount = Attendance::where('date', $date->format('Y-m-d'))
                ->where('status', 'present')
                ->count();
            $attendanceTrends[] = [
                'name' => $date->format('D'),
                'present' => $presentCount
            ];
        }

        // Department distribution (growth) - Mocked for now
        $growth = [
            ['name' => 'Jan', 'employees' => 12],
            ['name' => 'Feb', 'employees' => 15],
            ['name' => 'Mar', 'employees' => 18],
            ['name' => 'Apr', 'employees' => 22],
            ['name' => 'May', 'employees' => 25],
            ['name' => 'Jun', 'employees' => 30],
        ];

        return response()->json([
            'stats' => [
                'totalEmployees' => $totalEmployees,
                'onLeaveToday' => $onLeaveToday,
                'openPositions' => $openPositions,
                'performanceAvg' => $performanceAvg
            ],
            'attendanceTrends' => $attendanceTrends,
            'growth' => $growth
        ]);
    }
}
