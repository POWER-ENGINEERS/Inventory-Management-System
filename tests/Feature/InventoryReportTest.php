<?php

use AppModelsCategory;
use AppModelsProduct;
use AppModelsSupplier;
use IlluminateFoundationTestingRefreshDatabase;

uses(RefreshDatabase::class);

test('inventory report returns calculated inventory summary', function () {
    $category = Category::create([
        'category_name' => 'Christian Report Category',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Christian Report Supplier',
    ]);

    Product::create([
        'product_name' => 'Christian Report Product',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 4,
        'price' => 125,
        'status' => 'Active',
    ]);

    $this->withToken(authToken())
        ->getJson('/api/reports/inventory')
        ->assertOk()
        ->assertJsonPath('status', 'success')
        ->assertJsonPath('data.total_products', 1)
        ->assertJsonPath('data.total_quantity', 4)
        ->assertJsonPath('data.total_inventory_value', 500);
});

test('inventory report includes the product and recent transaction collections', function () {
    $category = Category::create([
        'category_name' => 'Christian Report Collection Category',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Christian Report Collection Supplier',
    ]);

    Product::create([
        'product_name' => 'Christian Report Collection Product',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 7,
        'price' => 50,
    ]);

    $response = $this->withToken(authToken())
        ->getJson('/api/reports/inventory');

    $response->assertOk()
        ->assertJsonStructure([
            'status',
            'data' => [
                'generated_at',
                'total_products',
                'total_quantity',
                'total_inventory_value',
                'low_stock_count',
                'products',
                'recent_transactions',
            ],
        ])
        ->assertJsonCount(1, 'data.products');
});
