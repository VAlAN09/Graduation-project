<?php

namespace App\Http\Controllers;

use App\Models\Alert;
use App\Models\alerts;
use Illuminate\Http\Request;

class AlertController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user(); // المستخدم اللي عامل request

        // لو alerts عنده user_id
        $alerts = alerts::select('alert_type', 'created_at')
            ->where('user_id', $user->user_id)  // فلترة على المستخدم الحالي
            ->latest('created_at')         // أحدث ال alerts يظهر أول
            ->get();

        return response()->json($alerts);
    }
}