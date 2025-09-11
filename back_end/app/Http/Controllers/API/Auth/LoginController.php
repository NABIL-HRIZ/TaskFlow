<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Email ou mot de passe incorrect'], 401);
        } 

        $user = Auth::user();
        
        // Créer token Sanctum
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
            'role'=>$user->getRoleNames()
        ]);
    }

    public function logout(Request $request)
{
    // delete current token only (recommended)
    $request->user()->currentAccessToken()->delete();

    // أو: delete all tokens of the user
    // $request->user()->tokens()->delete();

    return response()->json([
        'message' => 'Successfully logged out'
    ]);
}

}
