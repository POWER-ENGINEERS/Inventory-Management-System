<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('protected inventory endpoint rejects unauthenticated requests', function () {
    $response = $this->getJson('/api/products');

    $response->assertUnauthorized();
});

test('category cannot be deleted while products are linked to it', function () {
    $category = Category::create([
        'category_name' => 'QA Category',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'QA Supplier',
        'contact_number' => '09123456789',
    ]);

    Product::create([
        'product_name' => 'QA Product',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 10,
        'price' => 1000,
    ]);

    $response = $this->withToken(authToken())
        ->deleteJson('/api/categories/' . $category->category_id);

    $response->assertStatus(409)
        ->assertJsonPath('status', 'error');

    $this->assertDatabaseHas('categories', [
        'category_id' => $category->category_id,
    ]);
});

test('stock out rejects zero quantity before changing inventory', function () {
    $category = Category::create([
        'category_name' => 'Stock QA Category',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Stock QA Supplier',
        'contact_number' => '09123456789',
    ]);

    $product = Product::create([
        'product_name' => 'Stock QA Product',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 10,
        'price' => 1000,
    ]);

    $response = $this->withToken(authToken())
        ->postJson('/api/stock-outs', [
            'product_id' => $product->product_id,
            'quantity' => 0,
        ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['quantity']);

    $this->assertDatabaseHas('products', [
        'product_id' => $product->product_id,
        'quantity' => 10,
    ]);
});


test('search rejects overly long query input', function () {
    $response = $this->withToken(authToken())
        ->getJson('/api/productssearch?search=' . str_repeat('x', 101));

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['search']);
});

test('product update returns 404 for a missing product', function () {
    $response = $this->withToken(authToken())
        ->putJson('/api/products/99999', [
            'product_name' => 'Missing Product',
            'quantity' => 1,
            'price' => 10,
        ]);

    $response->assertStatus(404)
        ->assertJson([
            'status' => 'error',
            'error' => 'Product not found',
        ]);
});

test('stock in rejects zero quantity before changing inventory', function () {
    $category = Category::create([
        'category_name' => 'Stock In QA Category',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Stock In QA Supplier',
        'contact_number' => '09123456789',
    ]);

    $product = Product::create([
        'product_name' => 'Stock In QA Product',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 10,
        'price' => 1000,
    ]);

    $response = $this->withToken(authToken())
        ->postJson('/api/stock-ins', [
            'product_id' => $product->product_id,
            'quantity' => 0,
        ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['quantity']);

    $this->assertDatabaseHas('products', [
        'product_id' => $product->product_id,
        'quantity' => 10,
    ]);
});
