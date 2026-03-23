<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminEmployeeController extends Controller
{
    public function index()
    {
        $employees = User::with('department')->get();
        return response()->json($employees);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'department_id' => 'required|exists:departments,dep_id',
            'job_title' => 'nullable|string',
            'phone' => 'nullable|string',
            'role' => 'required|in:admin,employee,supervisor'
        ]);

        $validated['password'] = Hash::make($validated['password']);
        
        $employee = User::create($validated);

        return response()->json([
            'message' => 'Employee created successfully',
            'data' => $employee
        ]);
    }

    public function update(Request $request, $id)
    {
        $employee = User::findOrFail($id);
        
        $validated = $request->validate([
            'first_name' => 'string|max:255',
            'last_name' => 'string|max:255',
            'department_id' => 'exists:departments,dep_id',
            'job_title' => 'nullable|string',
            'phone' => 'nullable|string',
            'role' => 'in:admin,employee,supervisor'
        ]);

        $employee->update($validated);

        return response()->json([
            'message' => 'Employee updated successfully',
            'data' => $employee
        ]);
    }

    public function destroy($id)
    {
        $employee = User::findOrFail($id);
        $employee->delete();
        return response()->json(['message' => 'Employee deleted successfully']);
    }
}
