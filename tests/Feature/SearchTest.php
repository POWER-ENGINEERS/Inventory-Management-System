<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Category;
use App\Models\Supplier;
use App\Models\Product;

uses(RefreshDatabase::class);

test('product search returns matching products by name or sku', function () {
    $category = Category::create([
        'category_name' => 'Search Test Category',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Search Test Supplier',
        'contact_number' => '09123456789',
    ]);

    Product::create([
        'product_name' => 'Searchable Laptop',
        'sku' => 'LAP-001',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 5,
        'price' => 25000,
    ]);

    Product::create([
        'product_name' => 'Office Chair',
        'sku' => 'CHR-001',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 3,
        'price' => 5000,
    ]);

    $byName = $this->withToken(authToken())
        ->getJson('/api/productssearch?search=Laptop');

    $byName->assertStatus(200)
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.product_name', 'Searchable Laptop');

    $bySku = $this->withToken(authToken())
        ->getJson('/api/productssearch?q=CHR-001');

    $bySku->assertStatus(200)
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.sku', 'CHR-001');
});

test('product search rejects an overly long search term', function () {
    $search = str_repeat('a', 101);

    $response = $this->withToken(authToken())
        ->getJson('/api/productssearch?search=' . urlencode($search));

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['search']);
});
