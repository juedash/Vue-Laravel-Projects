<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    //
    public function login(Request $request)
    {
        $fields = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string'
            ]
        );

        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => ['These credentials do not match our records.']
            ], 401);
        }

        $token = $user->createToken('my-app-token')->plainTextToken;

        $response = [
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout()
    {
        Auth::logout();
        return response(null, 200);
    }
}
