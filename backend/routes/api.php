<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewUserControlle;
use App\Http\Controllers\AlertController;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\TaskController;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::post('/login', [AuthController::class, 'login']);

Route::post('/signup', [NewUserControlle::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {

    // Generate QR
    Route::get('/company-qr', function () {

        $token = Str::random(32);

        Cache::put('qr_token_' . $token, true, now()->addMinutes(10));

        return response(
            QrCode::size(300)->generate($token),
            200,
            ['Content-Type' => 'image/svg+xml']
        );
    });

    // Scan QR
    Route::post('/scan', [AttendanceController::class, 'scan']);

});


Route::middleware('auth:sanctum')->group(function () {

    Route::post('/leave-request', [LeaveController::class, 'store']);

});

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/supervisor/leave-requests', [LeaveController::class, 'supervisorLeaves']);

});

Route::middleware('auth:sanctum')->group(function () {

    Route::put('/leave/{id}/approve', [LeaveController::class, 'approve']);

    Route::put('/leave/{id}/reject', [LeaveController::class, 'reject']);

});

Route::middleware('auth:sanctum')->get('/alerts', [AlertController::class, 'index']);

Route::middleware('auth:sanctum')->get('/attendance-history', [AttendanceController::class, 'history']);

Route::middleware('auth:sanctum')->get('/leave-history', [LeaveController::class, 'leaveHistory']);

Route::middleware('auth:sanctum')->group(function () {

    // جلب المهام الخاصة بالموظف الحالي
    Route::get('/my-tasks', [TaskController::class, 'index']);

    // جلب كل المهام اللي السوبرفايزر أنشأها
    Route::get('/tasks/supervisor', [TaskController::class, 'supervisorTasks']);

    // إنشاء مهمة جديدة
    Route::post('/tasks', [TaskController::class, 'store']);

    // جلب تفاصيل مهمة معينة
    Route::get('/tasks/{id}', [TaskController::class, 'show']);

    // تعديل الـ status فقط
    Route::patch('/tasks/{id}', [TaskController::class, 'update']);

    // حذف مهمة
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);
});


