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


test('product update rejects negative price without changing the existing record', function () {
    $category = Category::create([
        'category_name' => 'Roderick QA Category',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Roderick QA Supplier',
        'contact_number' => '09123456789',
    ]);

    $product = Product::create([
        'product_name' => 'Roderick QA Product',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 20,
        'price' => 1500,
    ]);

    $response = $this->withToken(authToken())
        ->putJson('/api/products/' . $product->product_id, [
            'product_name' => 'Roderick QA Product',
            'quantity' => 20,
            'price' => -1,
        ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['price']);

    $this->assertDatabaseHas('products', [
        'product_id' => $product->product_id,
        'product_name' => 'Roderick QA Product',
        'quantity' => 20,
        'price' => 1500,
    ]);
});


test('stock in rejects negative quantity before changing inventory', function () {
    $category = Category::create([
        'category_name' => 'Roderick Stock In QA',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Roderick Stock In Supplier',
        'contact_number' => '09123456789',
    ]);

    $product = Product::create([
        'product_name' => 'Roderick Stock In Product',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 12,
        'price' => 1000,
    ]);

    $response = $this->withToken(authToken())
        ->postJson('/api/stock-ins', [
            'product_id' => $product->product_id,
            'quantity' => -2,
        ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['quantity']);

    $this->assertDatabaseHas('products', [
        'product_id' => $product->product_id,
        'quantity' => 12,
    ]);
});


test('stock out update rejects a quantity above available stock without changing the transaction', function () {
    $category = Category::create([
        'category_name' => 'Roderick Stock Out QA',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Roderick Stock Out Supplier',
        'contact_number' => '09123456789',
    ]);

    $product = Product::create([
        'product_name' => 'Roderick Stock Out Product',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 5,
        'price' => 1000,
    ]);

    $transaction = \App\Models\InventoryTransaction::create([
        'product_id' => $product->product_id,
        'transaction_type' => 'stock_out',
        'quantity' => 2,
        'transaction_date' => now(),
    ]);

    $response = $this->withToken(authToken())
        ->putJson('/api/stock-outs/' . $transaction->transaction_id, [
            'product_id' => $product->product_id,
            'quantity' => 6,
        ]);

    $response->assertStatus(422)
        ->assertJsonPath('field', 'quantity');

    $this->assertDatabaseHas('inventory_transactions', [
        'transaction_id' => $transaction->transaction_id,
        'quantity' => 2,
    ]);

    $this->assertDatabaseHas('products', [
        'product_id' => $product->product_id,
        'quantity' => 3,
    ]);
});

test('missing stock-out transaction returns 404', function () {
    $response = $this->withToken(authToken())
        ->getJson('/api/stock-outs/99999');

    $response->assertStatus(404)
        ->assertJson([
            'status' => 'error',
            'error' => 'Stock-out transaction not found',
        ]);
});

test('category creation rejects a name longer than 255 characters', function () {
    $response = $this->withToken(authToken())
        ->postJson('/api/categories', [
            'category_name' => str_repeat('C', 256),
        ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['category_name']);

    $this->assertDatabaseMissing('categories', [
        'category_name' => str_repeat('C', 256),
    ]);
});
