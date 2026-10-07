<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

uses(RefreshDatabase::class);

test('super admin can list user accounts without exposing passwords', function () {
    $admin = User::factory()->create([
        'username' => 'christian-superadmin',
        'role' => 'Super Admin',
        'status' => 'Active',
    ]);

    $user = User::factory()->create([
        'username' => 'christian-account-user',
        'email' => 'christian-account@example.com',
        'role' => 'Cashier',
        'status' => 'Active',
    ]);

    $response = $this->withToken($admin->createToken('test')->plainTextToken)
        ->getJson('/api/auth/users');

    $response->assertOk()
        ->assertJsonFragment([
            'id' => $user->id,
            'username' => 'christian-account-user',
            'role' => 'Cashier',
            'status' => 'Active',
        ])
        ->assertJsonMissingPath('users.0.password');
});

test('super admin can update a user account and hash a replacement password', function () {
    $admin = User::factory()->create([
        'username' => 'christian-update-admin',
        'role' => 'Super Admin',
        'status' => 'Active',
    ]);

    $user = User::factory()->create([
        'username' => 'christian-old-user',
        'email' => 'christian-old@example.com',
        'password' => Hash::make('old-password'),
        'role' => 'Cashier',
        'status' => 'Active',
    ]);

    $response = $this->withToken($admin->createToken('test')->plainTextToken)
        ->putJson('/api/auth/users/' . $user->id, [
            'name' => 'Updated Christian User',
            'username' => 'christian-new-user',
            'email' => 'christian-new@example.com',
            'role' => 'Warehouse Staff',
            'status' => 'Inactive',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ]);

    $response->assertOk()
        ->assertJsonPath('user.username', 'christian-new-user')
        ->assertJsonPath('user.role', 'Warehouse Staff')
        ->assertJsonPath('user.status', 'Inactive');

    $user->refresh();

    expect(Hash::check('new-password', $user->password))->toBeTrue();
    expect($user->username)->toBe('christian-new-user');
    expect($user->role)->toBe('Warehouse Staff');
    expect($user->status)->toBe('Inactive');
});

test('super admin cannot delete the currently signed-in account', function () {
    $admin = User::factory()->create([
        'username' => 'christian-self-delete-admin',
        'role' => 'Super Admin',
        'status' => 'Active',
    ]);

    $response = $this->withToken($admin->createToken('test')->plainTextToken)
        ->deleteJson('/api/auth/users/' . $admin->id);

    $response->assertStatus(422)
        ->assertJson([
            'message' => 'You cannot delete the currently signed-in Super Admin account.',
        ]);

    $this->assertDatabaseHas('users', [
        'id' => $admin->id,
        'username' => 'christian-self-delete-admin',
    ]);
});
