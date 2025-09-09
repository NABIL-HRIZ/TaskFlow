<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\User;


class UserController extends Controller
{
     public function profile(Request $request)
    {
        return response()->json([
            'user' => $request->user()
        ]);
    }


    public function myTasks(Request $request)
{
    $user = $request->user();

    $tasks =Task::with(['createdBy', 'assignedTo'])
        ->where('assigned_to', $user->id)
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json([
        'tasks' => $tasks
    ]);
}


   public function myTask($id, Request $request)
{
    $user = $request->user();

    $task = Task::with(['createdBy', 'assignedTo'])
        ->where('id', $id)
        ->where('assigned_to', $user->id) 
        ->firstOrFail();

    return response()->json([
        'task' => $task
    ]);
}

 public function allUsers(){
    
     return response()->json([
         'users' =>User::select('id', 'name', 'email')->get()
     ]);

 
   }

   public function updateMyTask(Request $request, $id)
{
    $user = $request->user();
    
    $task = Task::where('id', $id)
                ->where('assigned_to', $user->id)
                ->firstOrFail();

    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'status' => 'required|in:todo,in_progress,done',
        'priority' => 'required|in:low,medium,high',
        'due_date' => 'required|date',
    ]);

    $task->update($validated);

    return response()->json([
        'message' => 'Task updated successfully',
        'task' => $task->load('assignedTo', 'createdBy')
    ]);
}

public function deleteMyTask(Request $request, $id)
{
    $user = $request->user();
    
    $task = Task::where('id', $id)
                ->where('assigned_to', $user->id)
                ->firstOrFail();

    $task->delete();

    return response()->json(['message' => 'Task deleted successfully']);
}



}