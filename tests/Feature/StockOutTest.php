<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Category;
use App\Models\Supplier;
use App\Models\Product;
use App\Models\InventoryTransaction;

uses(RefreshDatabase::class);

test('stock-outs endpoint returns successful response', function () {
    $response = $this->getJson('/api/stock-outs');

    $response->assertStatus(200);
});

test('stock out can be created successfully', function () {
    $category = Category::create([
        'category_name' => 'Electronics',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Test Supplier',
        'contact_number' => '09123456789',
    ]);

    $product = Product::create([
        'product_name' => 'Test Laptop',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 10,
        'price' => 25000,
    ]);

    $response = $this->postJson('/api/stock-outs', [
        'product_id' => $product->product_id,
        'quantity' => 3,
    ]);

    $response->assertStatus(201)
        ->assertJson([
            'message' => 'Stock out recorded successfully',
            'transaction' => [
                'product_id' => $product->product_id,
                'transaction_type' => 'stock_out',
                'quantity' => 3,
            ],
        ]);

    $this->assertDatabaseHas('inventory_transactions', [
        'product_id' => $product->product_id,
        'transaction_type' => 'stock_out',
        'quantity' => 3,
    ]);

    $this->assertDatabaseHas('products', [
        'product_id' => $product->product_id,
        'quantity' => 7,
    ]);
});

test('stock out fails when required fields are missing', function () {
    $response = $this->postJson('/api/stock-outs', []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors([
            'product_id',
            'quantity',
        ]);
});

test('stock out fails when product does not exist', function () {
    $response = $this->postJson('/api/stock-outs', [
        'product_id' => 99999,
        'quantity' => 3,
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors([
            'product_id',
        ]);
});

test('stock out fails when requested quantity exceeds available stock', function () {
    $category = Category::create([
        'category_name' => 'Electronics',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Test Supplier',
        'contact_number' => '09123456789',
    ]);

    $product = Product::create([
        'product_name' => 'Test Laptop',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 5,
        'price' => 25000,
    ]);

    $response = $this->postJson('/api/stock-outs', [
        'product_id' => $product->product_id,
        'quantity' => 10,
    ]);

    $response->assertStatus(422)
        ->assertJson([
            'message' => 'Insufficient stock',
        ]);

    $this->assertDatabaseHas('products', [
        'product_id' => $product->product_id,
        'quantity' => 5,
    ]);
});

test('stock out fails when quantity is zero', function () {
    $category = Category::create([
        'category_name' => 'Electronics',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Test Supplier',
        'contact_number' => '09123456789',
    ]);

    $product = Product::create([
        'product_name' => 'Test Laptop',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 10,
        'price' => 25000,
    ]);

    $response = $this->postJson('/api/stock-outs', [
        'product_id' => $product->product_id,
        'quantity' => 0,
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors([
            'quantity',
        ]);
});