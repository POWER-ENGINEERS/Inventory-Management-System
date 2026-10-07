<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Supplier;

uses(RefreshDatabase::class);

test('suppliers endpoint returns successful response', function () {
    $response = $this->withToken(authToken())
        ->getJson('/api/suppliers');

    $response->assertStatus(200)
        ->assertJson([
            'status' => 'success',
        ])
        ->assertJsonStructure([
            'status',
            'data',
        ]);
});

test('supplier details can be retrieved successfully', function () {
    $supplier = Supplier::create([
        'supplier_name' => 'Detail Supplier',
        'contact_number' => '09123456789',
    ]);

    $response = $this->withToken(authToken())
        ->getJson(
            '/api/suppliers/' . $supplier->supplier_id
        );

    $response->assertStatus(200)
        ->assertJson([
            'status' => 'success',
            'data' => [
                'supplier_id' => $supplier->supplier_id,
                'supplier_name' => 'Detail Supplier',
                'contact_number' => '09123456789',
            ],
        ]);
});

test('supplier can be created successfully', function () {
    $response = $this->withToken(authToken())
        ->postJson('/api/suppliers', [
            'supplier_name' => 'New Supplier',
            'contact_number' => '09123456789',
        ]);

    $response->assertStatus(201)
        ->assertJson([
            'status' => 'success',
            'data' => [
                'supplier_name' => 'New Supplier',
                'contact_number' => '09123456789',
            ],
        ]);

    $this->assertDatabaseHas('suppliers', [
        'supplier_name' => 'New Supplier',
        'contact_number' => '09123456789',
    ]);
});

test('supplier can be updated successfully', function () {
    $supplier = Supplier::create([
        'supplier_name' => 'Original Supplier',
        'contact_number' => '09111111111',
    ]);

    $response = $this->withToken(authToken())
        ->putJson(
            '/api/suppliers/' . $supplier->supplier_id,
            [
                'supplier_name' => 'Updated Supplier',
                'contact_number' => '09222222222',
            ]
        );

    $response->assertStatus(200)
        ->assertJson([
            'status' => 'success',
            'data' => [
                'supplier_name' => 'Updated Supplier',
                'contact_number' => '09222222222',
            ],
        ]);

    $this->assertDatabaseHas('suppliers', [
        'supplier_id' => $supplier->supplier_id,
        'supplier_name' => 'Updated Supplier',
        'contact_number' => '09222222222',
    ]);
});

test('supplier can be deleted successfully', function () {
    $supplier = Supplier::create([
        'supplier_name' => 'Delete Supplier',
        'contact_number' => '09888888888',
    ]);

    $response = $this->withToken(authToken())
        ->deleteJson(
            '/api/suppliers/' . $supplier->supplier_id
        );

    $response->assertStatus(200)
        ->assertJson([
            'status' => 'success',
            'data' => [
                'message' => 'Supplier deleted successfully',
            ],
        ]);

    $this->assertDatabaseMissing('suppliers', [
        'supplier_id' => $supplier->supplier_id,
    ]);
});

test('supplier creation fails when supplier name is missing', function () {
    $response = $this->withToken(authToken())
        ->postJson('/api/suppliers', [
            'contact_number' => '09123456789',
        ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors([
            'supplier_name',
        ]);
});

test('updating nonexistent supplier returns 404', function () {
    $response = $this->withToken(authToken())
        ->putJson('/api/suppliers/99999', [
            'supplier_name' => 'Updated Supplier',
        ]);

    $response->assertStatus(404)
        ->assertJson([
            'status' => 'error',
            'error' => 'Supplier not found',
        ]);
});

test('deleting nonexistent supplier returns 404', function () {
    $response = $this->withToken(authToken())
        ->deleteJson('/api/suppliers/99999');

    $response->assertStatus(404)
        ->assertJson([
            'status' => 'error',
            'error' => 'Supplier not found',
        ]);
});

test('supplier creation rejects an invalid email address', function () {
    $response = $this->withToken(authToken())
        ->postJson('/api/suppliers', [
            'supplier_name' => 'Roderick Validation Supplier',
            'email' => 'not-an-email',
        ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['email']);

    $this->assertDatabaseMissing('suppliers', [
        'supplier_name' => 'Roderick Validation Supplier',
    ]);
});
