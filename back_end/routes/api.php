<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\RegisteredUserController;

use App\Http\Controllers\API\Auth\LoginController;
use App\Http\Controllers\API\Auth\AdminController;
use App\Http\Controllers\API\Auth\TaskController;
use App\Http\Controllers\API\Auth\UserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
});


Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [NewPasswordController::class, 'store']);



Route::middleware(['auth:sanctum', 'role:admin'])->get('/admin', [AdminController::class, 'getDashboard']);
Route::middleware(['auth:sanctum', 'role:admin'])->delete('/admin/{id}', [AdminController::class, 'deleteUser']);
Route::middleware(['auth:sanctum', 'role:admin'])->post('/admin', [AdminController::class, 'storeUser']);
Route::middleware(['auth:sanctum', 'role:admin'])->get('/admin/{id}', [AdminController::class, 'getUser']);
Route::middleware(['auth:sanctum', 'role:admin'])->put('/admin/{id}', [AdminController::class, 'updateUser']);





// task 

Route::middleware('auth:sanctum','role:admin')->group(function () {
    Route::get('/tasks', [TaskController::class, 'getTasks']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::get('/tasks/{id}', [TaskController::class, 'getTask']);
    Route::put('/task/{id}', [TaskController::class, 'updateTask']);
    Route::delete('/task/{id}',[TaskController::class, 'deleteTask']);
    Route::get('/last-tasks', [TaskController::class, 'getLastTasks']);

});

//user


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'profile']);
    Route::get('/my-tasks', [UserController::class, 'myTasks']);
    Route::get('/my-tasks/{id}', [UserController::class, 'myTask']);
    Route::put('/my-tasks/{id}', [UserController::class, 'updateMyTask']); 
    Route::delete('/my-tasks/{id}', [UserController::class, 'deleteMyTask']); 
    Route::get('/all-users', [UserController::class, 'allUsers']);
    Route::post('/tasks', [TaskController::class, 'store']);
});


