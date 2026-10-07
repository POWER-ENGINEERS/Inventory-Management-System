<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('inventory report export returns a csv with product data', function () {
    $category = Category::create([
        'category_name' => 'Christian Export Category',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Christian Export Supplier',
    ]);

    Product::create([
        'product_name' => 'Christian Export Product',
        'sku' => 'CHRISTIAN-EXPORT-001',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 3,
        'price' => 250,
        'status' => 'Active',
    ]);

    $response = $this->withToken(authToken())
        ->get('/api/reports/inventory/export');

    $response->assertOk()
        ->assertHeader('Content-Type', 'text/csv; charset=UTF-8');

    $csv = $response->streamedContent();

    expect($csv)
        ->toContain('Product ID,Product Name,SKU,Category,Supplier,Quantity,Price,Inventory Value,Status')
        ->toContain('Christian Export Product')
        ->toContain('CHRISTIAN-EXPORT-001')
        ->toContain('750');
});
