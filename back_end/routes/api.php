<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\API\Auth\LoginController;
use App\Http\Controllers\API\Auth\AdminController;
use App\Http\Controllers\API\Auth\TaskController;



Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
});

Route::middleware(['auth:sanctum', 'role:admin'])->get('/admin', [AdminController::class, 'getDashboard']);
Route::middleware(['auth:sanctum', 'role:admin'])->delete('/admin/{id}', [AdminController::class, 'deleteUser']);
Route::middleware(['auth:sanctum', 'role:admin'])->post('/admin', [AdminController::class, 'storeUser']);
Route::middleware(['auth:sanctum', 'role:admin'])->get('/admin/{id}', [AdminController::class, 'getUser']);
Route::middleware(['auth:sanctum', 'role:admin'])->put('/admin/{id}', [AdminController::class, 'updateUser']);




Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [LoginController::class, 'login']);


// task 

Route::middleware('auth:sanctum','role:admin')->group(function () {
    Route::get('/tasks', [TaskController::class, 'getTasks']);
    Route::post('/tasks', [TaskController::class, 'store']);
});


