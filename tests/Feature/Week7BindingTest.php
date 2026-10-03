<?php

use App\Models\Category;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

function week7AuthToken(): string
{
    return User::factory()->create([
        'username' => 'week7-superadmin',
        'role' => 'Super Admin',
        'status' => 'Active',
    ])->createToken('week7-tests')->plainTextToken;
}

test('frontend-shaped product payload can be created through Laravel', function () {
    $category = Category::create([
        'category_name' => 'Electronics',
        'description' => 'Frontend category',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Frontend Supplier',
        'contact_person' => 'Jane Supplier',
        'contact_number' => '09123456789',
        'phone' => '09123456789',
        'email' => 'supplier@example.com',
        'address' => 'Davao City',
    ]);

    $response = $this->withToken(week7AuthToken())->postJson('/api/products', [
        'product_name' => 'Frontend Product',
        'sku' => 'WEB-001',
        'barcode' => '480000000001',
        'category_id' => $category->category_id,
        'brand' => 'Generic',
        'supplier_id' => $supplier->supplier_id,
        'unit' => 'pcs',
        'purchase_price' => 100,
        'selling_price' => 150,
        'price' => 150,
        'quantity' => 8,
        'expiration' => null,
        'description' => 'Created from the existing frontend form',
        'image' => '',
        'status' => 'Active',
    ]);

    $response->assertStatus(201)
        ->assertJsonPath('data.product_name', 'Frontend Product')
        ->assertJsonPath('data.sku', 'WEB-001')
        ->assertJsonPath('data.purchase_price', '100.00')
        ->assertJsonPath('data.selling_price', '150.00')
        ->assertJsonPath('data.quantity', 8);

    $this->assertDatabaseHas('products', [
        'product_name' => 'Frontend Product',
        'sku' => 'WEB-001',
        'quantity' => 8,
    ]);
});

test('frontend-shaped product update persists to Laravel', function () {
    $category = Category::create(['category_name' => 'Computers']);
    $supplier = Supplier::create([
        'supplier_name' => 'Original Supplier',
        'contact_number' => '09111111111',
    ]);

    $product = \App\Models\Product::create([
        'product_name' => 'Original Product',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 2,
        'price' => 100,
    ]);

    $response = $this->withToken(week7AuthToken())->putJson('/api/products/' . $product->product_id, [
        'product_name' => 'Updated Frontend Product',
        'sku' => 'WEB-002',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 12,
        'purchase_price' => 90,
        'selling_price' => 140,
        'price' => 140,
        'status' => 'Active',
    ]);

    $response->assertStatus(200)
        ->assertJsonPath('data.product_name', 'Updated Frontend Product')
        ->assertJsonPath('data.sku', 'WEB-002')
        ->assertJsonPath('data.quantity', 12);

    $this->assertDatabaseHas('products', [
        'product_id' => $product->product_id,
        'product_name' => 'Updated Frontend Product',
        'sku' => 'WEB-002',
        'quantity' => 12,
    ]);
});

test('frontend-shaped supplier payload can be created and updated', function () {
    $create = $this->withToken(week7AuthToken())->postJson('/api/suppliers', [
        'supplier_name' => 'Frontend Supplier',
        'contact_person' => 'John Doe',
        'contact_number' => '09123456789',
        'phone' => '09123456789',
        'email' => 'john@example.com',
        'address' => 'Davao City',
    ]);

    $create->assertStatus(201)
        ->assertJsonPath('data.supplier_name', 'Frontend Supplier')
        ->assertJsonPath('data.contact_person', 'John Doe')
        ->assertJsonPath('data.email', 'john@example.com');

    $id = $create->json('data.supplier_id');

    $update = $this->withToken(week7AuthToken())->putJson('/api/suppliers/' . $id, [
        'supplier_name' => 'Updated Frontend Supplier',
        'contact_person' => 'Jane Doe',
        'contact_number' => '09999999999',
        'phone' => '09999999999',
        'email' => 'jane@example.com',
        'address' => 'Tagum City',
    ]);

    $update->assertStatus(200)
        ->assertJsonPath('data.supplier_name', 'Updated Frontend Supplier')
        ->assertJsonPath('data.contact_person', 'Jane Doe')
        ->assertJsonPath('data.email', 'jane@example.com');

    $this->assertDatabaseHas('suppliers', [
        'supplier_id' => $id,
        'supplier_name' => 'Updated Frontend Supplier',
        'email' => 'jane@example.com',
    ]);
});

test('invalid frontend product data returns validation errors', function () {
    $response = $this->withToken(week7AuthToken())->postJson('/api/products', [
        'product_name' => '',
        'category_id' => 999999,
        'supplier_id' => 999999,
        'quantity' => -1,
        'price' => -1,
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors([
            'product_name',
            'category_id',
            'supplier_id',
            'quantity',
            'price',
        ]);
});
