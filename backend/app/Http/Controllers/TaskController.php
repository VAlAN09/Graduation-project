<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tasks;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    // جلب المهام المخصصة للموظف الحالي
    public function index(Request $request)
    {
        $user = $request->user();
        
        // جلب المهام ومعاها بيانات اللي أنشأها
        $tasks = Tasks::with('creator')
            ->where('assigned_to', $user->user_id)
            ->orderBy('due_date', 'asc')
            ->get();


        return response()->json($tasks);
    }

    // جلب كل المهام اللي السوبرفايزر أنشأها
    public function supervisorTasks(Request $request)
    {
        $user = $request->user();
        
        // جلب المهام اللي اليوزر ده كريتها ومعاها بيانات الموظف المخصص له
        $tasks = Tasks::with('assignee')
            ->where('created_by', $user->user_id)
            ->orderBy('due_date', 'asc')
            ->get();

        return response()->json($tasks);
    }

    // إنشاء مهمة جديدة
    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date'    => 'required|date|after_or_equal:today', // تأكد إن التاريخ مش قديم
            'assigned_to' => 'required|exists:users,user_id'
        ]);

        $task = Tasks::create([
            'title'       => $request->title,
            'description' => $request->description,
            'due_date'    => $request->due_date,
            'assigned_to' => $request->assigned_to,
            'created_by'  => $request->user()->user_id
        ]);

        return response()->json(['message' => 'Task created'], 201);
    }

    // جلب تفاصيل مهمة واحدة مع حماية الخصوصية
    public function show($id)
    {
        $user = Auth::user();
        $task = Tasks::findOrFail($id);

        // حماية: مسموح فقط للمسؤول عن المهمة أو منشئها برؤيتها
        if ($task->assigned_to != $user->user_id && $task->created_by != $user->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($task);
    }

    // تعديل الـ status مع حماية
    public function update(Request $request, $id)
    {
        $task = Tasks::findOrFail($id);
        $user = Auth::user();

        // حماية: الموظف المخصص له المهمة هو فقط من يغير حالتها
        if ($task->assigned_to != $user->user_id) {
            return response()->json(['message' => 'You can only update tasks assigned to you'], 403);
        }

        $request->validate([
            'status' => 'required|string|in:progress,completed'
        ]);

        $task->update(['status' => $request->status]);

        return response()->json(['message' => 'Status updated']);
    }

    // حذف مهمة (للمشرف فقط)
    public function destroy($id)
    {
        $task = Tasks::findOrFail($id);

        // حماية: اللي كريت المهمة بس هو اللي يحذفها
        if ($task->created_by != Auth::id()) {
            return response()->json(['message' => 'Only the creator can delete this task'], 403);
        }

        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }
}