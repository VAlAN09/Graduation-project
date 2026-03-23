<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user()->load('department');

        return response()->json([
            'name' => $user->first_name . ' ' . $user->last_name,
            'role' => $user->role,
            'position' => $user->job_title,
            'employeeId' => $user->user_id,
            'email' => $user->email,
            'phone' => $user->phone,
            'department' => $user->department ? $user->department->dep_name : '---',
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'phone' => 'nullable|string|max:50',
            // Add other fields if needed
        ]);

        $user->update($request->only('phone'));

        return response()->json(['message' => 'Profile updated successfully']);
    }
}
