<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AccountController extends Controller
{
    private function ensureSuperAdmin(Request $request): void
    {
        if ($request->user()->role !== 'Super Admin') {
            abort(response()->json([
                'message' => 'Only the Super Admin can manage user accounts.'
            ], 403));
        }
    }

    public function index(Request $request)
    {
        $this->ensureSuperAdmin($request);

        return response()->json([
            'users' => User::query()
                ->select('id', 'name', 'username', 'email', 'role', 'status', 'created_at')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $this->ensureSuperAdmin($request);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:50', 'alpha_dash', 'unique:users,username'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => [
                'required',
                Rule::in(['Super Admin', 'Administrator', 'Cashier', 'Warehouse Staff']),
            ],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role' => $validated['role'],
            'status' => 'Active',
        ]);

        return response()->json([
            'message' => 'User account created successfully.',
            'user' => $user->only(['id', 'name', 'username', 'email', 'role', 'status']),
        ], 201);
    }
}
