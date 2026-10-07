<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('logout revokes the current access token', function () {
    $user = User::factory()->create([
        'role' => 'Super Admin',
        'status' => 'Active',
    ]);

    $token = $user->createToken('logout-test')->plainTextToken;

    $this->withToken($token)
        ->postJson('/api/auth/logout')
        ->assertOk()
        ->assertJson([
            'message' => 'Logout successful',
        ]);

    $this->withToken($token)
        ->getJson('/api/products')
        ->assertUnauthorized();

    $this->assertDatabaseMissing('personal_access_tokens', [
        'tokenable_id' => $user->id,
        'name' => 'logout-test',
    ]);
});
