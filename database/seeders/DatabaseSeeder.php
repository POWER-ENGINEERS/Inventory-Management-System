<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $password = env('SUPER_ADMIN_PASSWORD');

        if (!$password) {
            throw new \RuntimeException(
                'SUPER_ADMIN_PASSWORD must be set in .env before running the database seeder.'
            );
        }

        User::updateOrCreate(
            ['username' => env('SUPER_ADMIN_USERNAME', 'superadmin')],
            [
                'name' => env('SUPER_ADMIN_NAME', 'Super Admin'),
                'email' => env('SUPER_ADMIN_EMAIL', 'superadmin@dabugss.com'),
                'password' => $password,
                'role' => 'Super Admin',
                'status' => 'Active',
            ]
        );
    }
}
