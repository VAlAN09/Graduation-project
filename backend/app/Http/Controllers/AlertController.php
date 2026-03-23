<?php

namespace App\Http\Controllers;

use App\Models\Alert;
use Illuminate\Http\Request;


class AlertController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user(); // المستخدم اللي عامل request

        // استخدام موديل Alert بدلاً من alerts
        $alerts = Alert::select('alert_type', 'content', 'created_at')
            ->where('user_id', $user->user_id)  // فلترة على المستخدم الحالي
            ->latest('created_at')         // أحدث ال alerts يظهر أول
            ->get();


        return response()->json($alerts);
    }
}