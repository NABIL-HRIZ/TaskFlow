<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
class TaskController extends Controller
{
 
      public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:todo,in_progress,done',
            'priority' => 'nullable|in:low,medium,high',
            'due_date' =>'required|date',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'status' => $validated['status'] ?? 'todo',
            'priority' => $validated['priority'] ?? 'medium',
            'due_date' => $validated['due_date'] ?? null,
            'assigned_to' => $validated['assigned_to'] ?? null,
            'created_by' => $request->user()->id, 
        ]);

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task,
        ], 201);
    }


    public function getTasks(){

        $tasks = Task::with(['assignedTo', 'createdBy']) ->orderBy('created_at', 'desc')->get();

        return response()->json([
            'tasks' => $tasks,
        ]);
    }

    public function updateTask(Request $request, $id)
{
    $task = Task::findOrFail($id);

    $request->validate([
          'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:todo,in_progress,done',
            'priority' => 'nullable|in:low,medium,high',
            'due_date' =>'required|date',
            'assigned_to' => 'nullable|exists:users,id',
    ]);

    $task->update([
        'title' => $request->title,
        'description' => $request->description,
        'status' => $request->status,
        'priority' => $request->priority,
        'due_date' => $request->due_date,
        'assigned_to' => $request->assigned_to,

    ]);



   return response()->json(['message' => 'Task updated successfully', 'task' => $task]);

}

  public function getTask($id)
{
    $task = Task::with(['assignedTo', 'createdBy'])->findOrFail($id);

    return response()->json([
        'task' => $task,
    ]);
}

 public function deleteTask($id){
    $task = Task::findOrFail($id);
    $task->delete();

    return response()->json(['message' => 'Task deleted successfully']);
}

public function getLastTasks(){
    $last_tasks = Task::with(['assignedTo', 'createdBy'])->orderBy('created_at', 'desc') ->take(5)->get();

        return response()->json([
            'last_tasks' => $last_tasks,
        ]);
}

}

