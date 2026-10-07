<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class LaravelAuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_can_log_in_with_username(): void
    {
        $user = User::factory()->create([
            'name' => 'Super Admin',
            'username' => 'superadmin',
            'email' => 'superadmin@example.com',
            'password' => Hash::make('password123'),
            'role' => 'Super Admin',
            'status' => 'Active',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'identifier' => 'superadmin',
            'password' => 'password123',
            'role' => 'Super Admin',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('user.id', $user->id)
            ->assertJsonPath('user.role', 'Super Admin')
            ->assertJsonStructure(['token', 'user']);
    }

    public function test_super_admin_can_create_a_user_account(): void
    {
        $admin = User::factory()->create([
            'username' => 'superadmin',
            'role' => 'Super Admin',
            'status' => 'Active',
        ]);

        $token = $admin->createToken('test')->plainTextToken;

        $response = $this
            ->withToken($token)
            ->postJson('/api/auth/users', [
                'name' => 'New Cashier',
                'username' => 'newcashier',
                'email' => 'cashier@example.com',
                'password' => 'password123',
                'password_confirmation' => 'password123',
                'role' => 'Cashier',
            ]);

        $response->assertCreated();

        $this->assertDatabaseHas('users', [
            'username' => 'newcashier',
            'role' => 'Cashier',
            'status' => 'Active',
        ]);
    }

    public function test_non_super_admin_cannot_create_accounts(): void
    {
        $admin = User::factory()->create([
            'username' => 'cashier',
            'role' => 'Cashier',
            'status' => 'Active',
        ]);

        $token = $admin->createToken('test')->plainTextToken;

        $this
            ->withToken($token)
            ->postJson('/api/auth/users', [
                'name' => 'Blocked User',
                'username' => 'blocked',
                'email' => 'blocked@example.com',
                'password' => 'password123',
                'password_confirmation' => 'password123',
                'role' => 'Cashier',
            ])
            ->assertForbidden();
    }

    public function test_login_rejects_invalid_password_with_clear_401_response(): void
    {
        User::factory()->create([
            'username' => 'roderickuser',
            'email' => 'roderick.qa@example.com',
            'password' => Hash::make('correct-password'),
            'role' => 'Cashier',
            'status' => 'Active',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'identifier' => 'roderickuser',
            'password' => 'wrong-password',
            'role' => 'Cashier',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Invalid username/email, password, or account type.',
            ])
            ->assertJsonMissing(['token']);
    }


    public function test_login_rejects_an_inactive_account(): void
    {
        User::factory()->create([
            'username' => 'inactiveuser',
            'email' => 'inactive@example.com',
            'password' => Hash::make('password123'),
            'role' => 'Cashier',
            'status' => 'Inactive',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'identifier' => 'inactiveuser',
            'password' => 'password123',
            'role' => 'Cashier',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Invalid username/email, password, or account type.',
            ])
            ->assertJsonMissing(['token']);
    }

    public function test_login_rejects_a_role_mismatch(): void
    {
        User::factory()->create([
            'username' => 'roleuser',
            'email' => 'role@example.com',
            'password' => Hash::make('password123'),
            'role' => 'Cashier',
            'status' => 'Active',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'identifier' => 'roleuser',
            'password' => 'password123',
            'role' => 'Warehouse Staff',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Invalid username/email, password, or account type.',
            ])
            ->assertJsonMissing(['token']);
    }

}
