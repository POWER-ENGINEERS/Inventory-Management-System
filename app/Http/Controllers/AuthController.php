<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'identifier' => 'required|string',
            'password' => 'required|string',
            'role' => 'required|in:Super Admin,Administrator,Cashier,Warehouse Staff',
        ]);

        $user = User::query()
            ->where(function ($query) use ($validated) {
                $query->where('username', $validated['identifier'])
                    ->orWhere('email', $validated['identifier']);
            })
            ->where('role', $validated['role'])
            ->where('status', 'Active')
            ->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid username/email, password, or account type.'
            ], 401);
        }

        $token = $user->createToken('inventory-web')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    public function logout(Request $request)
    {
        $token = $request->user()->currentAccessToken();

        if ($token) {
            $token->delete();
        }

        return response()->json([
            'message' => 'Logout successful'
        ], 200);
    }
}
