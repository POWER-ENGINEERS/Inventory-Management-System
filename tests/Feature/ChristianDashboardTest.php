<?php

use App\Models\Category;
use App\Models\InventoryTransaction;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('dashboard calculates inventory counters and identifies low-stock products', function () {
    $category = Category::create([
        'category_name' => 'Christian Dashboard Category',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Christian Dashboard Supplier',
    ]);

    Product::create([
        'product_name' => 'Christian Low Stock Product',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 5,
        'price' => 100,
        'status' => 'Active',
    ]);

    Product::create([
        'product_name' => 'Christian Healthy Stock Product',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 20,
        'price' => 200,
        'status' => 'Active',
    ]);

    InventoryTransaction::create([
        'product_id' => Product::where('product_name', 'Christian Low Stock Product')->value('product_id'),
        'transaction_type' => 'stock_in',
        'quantity' => 5,
        'transaction_date' => now(),
    ]);

    $response = $this->withToken(authToken())
        ->getJson('/api/dashboard');

    $response->assertOk()
        ->assertJsonPath('status', 'success')
        ->assertJsonPath('data.total_products', 2)
        ->assertJsonPath('data.total_categories', 1)
        ->assertJsonPath('data.total_suppliers', 1)
        ->assertJsonPath('data.total_quantity', 25)
        ->assertJsonPath('data.low_stock_count', 1)
        ->assertJsonPath('data.stock_in_count', 1)
        ->assertJsonCount(1, 'data.low_stock_products')
        ->assertJsonPath('data.low_stock_products.0.product_name', 'Christian Low Stock Product');
});

test('dashboard requires authentication', function () {
    $this->getJson('/api/dashboard')
        ->assertUnauthorized();
});
