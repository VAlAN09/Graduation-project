<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\LeaveBalance;
use Illuminate\Support\Facades\Hash;

class NewUserControlle extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'first_name'     => 'required|string|max:255',
            'last_name'      => 'required|string|max:255',
            'email'          => 'required|email|unique:users,email',
            'password'       => 'required|min:6',
            'role'           => 'required|string',
            'base_salary'    => 'nullable|numeric',
            'phone'          => 'nullable|string',
            'job_title'      => 'nullable|string',
            'department_id'  => 'nullable|integer',
            'supervisor_id'  => 'nullable|integer',
        ]);

        $user = User::create([
            'first_name'     => $request->first_name,
            'last_name'      => $request->last_name,
            'email'          => $request->email,
            'password'       => Hash::make($request->password),
            'role'           => $request->role,
            'base_salary'    => $request->base_salary,
            'phone'          => $request->phone,
            'job_title'      => $request->job_title,
            'department_id'  => $request->department_id,
            'supervisor_id'  => $request->supervisor_id,
        ]);

        // إنشاء leave balance تلقائي
        LeaveBalance::create([
            'user_id' => $user->user_id,
            'year'    => date('Y'),
            'annual'  => 21,
            'sick'    => 10,
            'casual'  => 5
        ]);

        return response()->json([
            'message' => 'User created successfully'
        ], 201);
    }
}
