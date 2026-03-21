<?php
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

try {
    $admin = User::updateOrCreate(
        ['email' => 'admin@example.com'],
        [
            'first_name' => 'Admin',
            'last_name' => 'User',
            'phone' => '1234567890',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'job_title' => 'Manager',
            'base_salary' => 5000.00,
            'emp_id' => 'EMP-001'
        ]
    );

    $employee = User::updateOrCreate(
        ['email' => 'employee@example.com'],
        [
            'first_name' => 'Employee',
            'last_name' => 'User',
            'phone' => '0987654321',
            'password' => Hash::make('password123'),
            'role' => 'employee',
            'job_title' => 'Developer',
            'base_salary' => 3000.00,
            'emp_id' => 'EMP-002'
        ]
    );

    echo "Successfully created two test users:\n";
    echo "Admin: admin@example.com / password123\n";
    echo "Employee: employee@example.com / password123\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
