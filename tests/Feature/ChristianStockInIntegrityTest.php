<?php

use App\Models\Category;
use App\Models\InventoryTransaction;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('stock-in update returns 404 for a missing transaction', function () {
    $category = Category::create([
        'category_name' => 'Christian Missing Stock In Category',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Christian Missing Stock In Supplier',
    ]);

    $product = Product::create([
        'product_name' => 'Christian Missing Stock In Product',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 10,
        'price' => 100,
    ]);

    $response = $this->withToken(authToken())
        ->putJson('/api/stock-ins/99999', [
            'product_id' => $product->product_id,
            'quantity' => 5,
        ]);

    $response->assertStatus(404)
        ->assertJson([
            'status' => 'error',
            'error' => 'Stock-in transaction not found',
        ]);
});

test('stock-in deletion protects inventory when current stock is too low', function () {
    $category = Category::create([
        'category_name' => 'Christian Stock In Integrity Category',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Christian Stock In Integrity Supplier',
    ]);

    $product = Product::create([
        'product_name' => 'Christian Stock In Integrity Product',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 2,
        'price' => 100,
    ]);

    $transaction = InventoryTransaction::create([
        'product_id' => $product->product_id,
        'transaction_type' => 'stock_in',
        'quantity' => 5,
        'transaction_date' => now(),
    ]);

    $response = $this->withToken(authToken())
        ->deleteJson('/api/stock-ins/' . $transaction->transaction_id);

    $response->assertStatus(409)
        ->assertJson([
            'status' => 'error',
            'error' => 'Cannot delete this transaction because current stock is lower than the transaction quantity.',
        ]);

    $this->assertDatabaseHas('inventory_transactions', [
        'transaction_id' => $transaction->transaction_id,
        'quantity' => 5,
    ]);

    $this->assertDatabaseHas('products', [
        'product_id' => $product->product_id,
        'quantity' => 2,
    ]);
});
