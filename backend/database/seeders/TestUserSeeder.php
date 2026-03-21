<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'first_name' => 'Admin',
                'last_name' => 'User',
                'phone' => '1234567890',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'job_title' => 'Manager',
                'base_salary' => 5000.00
            ]
        );

        $employee = User::firstOrCreate(
            ['email' => 'employee@example.com'],
            [
                'first_name' => 'Employee',
                'last_name' => 'User',
                'phone' => '0987654321',
                'password' => Hash::make('password123'),
                'role' => 'employee',
                'job_title' => 'Developer',
                'base_salary' => 3000.00
            ]
        );
    }
}
