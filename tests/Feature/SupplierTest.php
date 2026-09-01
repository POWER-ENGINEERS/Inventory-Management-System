<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Supplier;

uses(RefreshDatabase::class);

test('suppliers endpoint returns successful response', function () {
    $response = $this->getJson('/api/suppliers');

    $response->assertStatus(200)
        ->assertJson([
            'status' => 'success',
        ])
        ->assertJsonStructure([
            'status',
            'data',
        ]);
});

test('supplier can be created successfully', function () {
    $response = $this->postJson('/api/suppliers', [
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

    $response = $this->putJson('/api/suppliers/' . $supplier->supplier_id, [
        'supplier_name' => 'Updated Supplier',
        'contact_number' => '09222222222',
    ]);

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

    $response = $this->deleteJson('/api/suppliers/' . $supplier->supplier_id);

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
    $response = $this->postJson('/api/suppliers', [
        'contact_number' => '09123456789',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors([
            'supplier_name',
        ]);
});

test('updating nonexistent supplier returns 404', function () {
    $response = $this->putJson('/api/suppliers/99999', [
        'supplier_name' => 'Updated Supplier',
    ]);

    $response->assertStatus(404)
        ->assertJson([
            'status' => 'error',
            'error' => 'Supplier not found',
        ]);
});

test('deleting nonexistent supplier returns 404', function () {
    $response = $this->deleteJson('/api/suppliers/99999');

    $response->assertStatus(404)
        ->assertJson([
            'status' => 'error',
            'error' => 'Supplier not found',
        ]);
});