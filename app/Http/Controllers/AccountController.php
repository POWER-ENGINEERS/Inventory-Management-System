<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;

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
                ->select('id', 'name', 'username', 'email', 'phone', 'role', 'status', 'created_at')
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
            'phone' => ['nullable', 'string', 'max:30'],
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
            'phone' => $validated['phone'] ?? null,
            'password' => $validated['password'],
            'role' => $validated['role'],
            'status' => 'Active',
        ]);

        return response()->json([
            'message' => 'User account created successfully.',
            'user' => $user->only(['id', 'name', 'username', 'email', 'phone', 'role', 'status']),
        ], 201);
    }

    public function update(Request $request, User $user)
    {
        $this->ensureSuperAdmin($request);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:50', 'alpha_dash', Rule::unique('users', 'username')->ignore($user->id)],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'phone' => ['nullable', 'string', 'max:30'],
            'role' => [
                'required',
                Rule::in(['Super Admin', 'Administrator', 'Cashier', 'Warehouse Staff']),
            ],
            'status' => ['required', Rule::in(['Active', 'Inactive'])],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        $user->name = $validated['name'];
        $user->username = $validated['username'];
        $user->email = $validated['email'];
        $user->phone = $validated['phone'] ?? null;
        $user->role = $validated['role'];
        $user->status = $validated['status'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return response()->json([
            'message' => 'User account updated successfully.',
            'user' => $user->only(['id', 'name', 'username', 'email', 'phone', 'role', 'status']),
        ]);
    }

    public function destroy(Request $request, User $user)
    {
        $this->ensureSuperAdmin($request);

        if ($user->id === $request->user()->id) {
            return response()->json([
                'message' => 'You cannot delete the currently signed-in Super Admin account.'
            ], 422);
        }

        $user->tokens()->delete();
        $user->delete();

        return response()->json([
            'message' => 'User account deleted successfully.'
        ]);
    }
}
