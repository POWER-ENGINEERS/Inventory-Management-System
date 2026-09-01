<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Category;
use App\Models\Supplier;
use App\Models\Product;

uses(RefreshDatabase::class);

test('products endpoint returns successful response', function () {
    $response = $this->getJson('/api/products');

    $response->assertStatus(200)
        ->assertJson([
            'status' => 'success',
        ]);
});

test('product details returns the requested product', function () {
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

    $response = $this->getJson('/api/products/' . $product->product_id);

    $response->assertStatus(200)
        ->assertJson([
            'status' => 'success',
            'data' => [
                'product_id' => $product->product_id,
                'product_name' => 'Test Laptop',
            ],
        ]);
});

test('product can be created successfully', function () {
    $category = Category::create([
        'category_name' => 'Computers',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'New Supplier',
        'contact_number' => '09999999999',
    ]);

    $response = $this->postJson('/api/products', [
        'product_name' => 'Gaming PC',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 10,
        'price' => 50000,
    ]);

    $response->assertStatus(201)
        ->assertJson([
            'status' => 'success',
            'data' => [
                'product_name' => 'Gaming PC',
                'category_id' => $category->category_id,
                'supplier_id' => $supplier->supplier_id,
                'quantity' => 10,
                'price' => '50000.00',
            ],
        ]);

    $this->assertDatabaseHas('products', [
        'product_name' => 'Gaming PC',
    ]);
});

test('product can be updated successfully', function () {
    $category = Category::create([
        'category_name' => 'Computers',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Original Supplier',
        'contact_number' => '09111111111',
    ]);

    $product = Product::create([
        'product_name' => 'Old Laptop',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 5,
        'price' => 20000,
    ]);

    $response = $this->putJson('/api/products/' . $product->product_id, [
        'product_name' => 'Updated Laptop',
        'quantity' => 15,
        'price' => 30000,
    ]);

    $response->assertStatus(200)
        ->assertJson([
            'status' => 'success',
            'data' => [
                'product_name' => 'Updated Laptop',
                'quantity' => 15,
                'price' => '30000.00',
            ],
        ]);

    $this->assertDatabaseHas('products', [
        'product_id' => $product->product_id,
        'product_name' => 'Updated Laptop',
        'quantity' => 15,
    ]);
});

test('product can be deleted successfully', function () {
    $category = Category::create([
        'category_name' => 'Accessories',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Delete Supplier',
        'contact_number' => '09888888888',
    ]);

    $product = Product::create([
        'product_name' => 'Product To Delete',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 5,
        'price' => 1000,
    ]);

    $response = $this->deleteJson('/api/products/' . $product->product_id);

    $response->assertStatus(200)
        ->assertJson([
            'status' => 'success',
            'data' => [
                'message' => 'Product deleted successfully',
            ],
        ]);

    $this->assertDatabaseMissing('products', [
        'product_id' => $product->product_id,
    ]);
});

test('product creation fails when required fields are missing', function () {
    $response = $this->postJson('/api/products', [
        'product_name' => 'Incomplete Product',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors([
            'category_id',
            'supplier_id',
            'quantity',
            'price',
        ]);
});

test('product details returns 404 when product does not exist', function () {
    $response = $this->getJson('/api/products/9999');

    $response->assertStatus(404)
        ->assertJson([
            'status' => 'error',
            'error' => 'Product not found',
        ]);
});