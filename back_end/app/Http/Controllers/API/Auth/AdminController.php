<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\Rules;
use Illuminate\Http\JsonResponse;

class AdminController extends Controller
{
   public function getDashboard(Request $request)
{
    $admin = $request->user();

    // Determine admin's main role (prioritize 'admin')
    $roles = $admin->getRoleNames(); // collection of roles
    $adminRole = $roles->contains('admin') ? 'admin' : $roles->first();

    // Get all users with role 'user' and their first role
    $users = User::role('user')
        ->with('roles')
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(fn($user) => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->getRoleNames()->first(), // usually 'user'
        ]);

    // Return admin info and users
    return response()->json([
        'admin' => [
            'id' => $admin->id,
            'name' => $admin->name,
            'email' => $admin->email,
            'role' => $adminRole,
        ],
        'users' => $users,
    ]);
}


   public function deleteUser($id)
{
    $user = User::findOrFail($id);
    $user->delete();

    return response()->json(['message' => 'User deleted successfully']);
}


public function storeUser(Request $request): JsonResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        
        $user->assignRole('user');

        event(new Registered($user));


         $token = $user->createToken('auth_token')->plainTextToken;

       return response()->json([
    'token' => $token,
    'user'  => $user,
    'role'  => $user->getRoleNames(),
]);
    }

  public function getUser($id)
{
    $user = User::findOrFail($id);

     return response()->json([
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->getRoleNames()->first(),
        ]
    ]);
}

public function updateUser(Request $request, $id)
{
    $user = User::findOrFail($id);

    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email,' . $id,
        'role' => 'required|string',
    ]);

    $user->update([
        'name' => $request->name,
        'email' => $request->email,
    ]);

    if ($request->role !== $user->getRoleNames()->first()) {
        $user->syncRoles([$request->role]);
    }

    return response()->json(['message' => 'User updated successfully', 'user' => $user]);
}

   





}
