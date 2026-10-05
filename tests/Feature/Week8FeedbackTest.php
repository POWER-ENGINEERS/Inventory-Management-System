<?php

use AppModels\Category;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('Week 8 product validation returns inline-ready 422 data', function () {
    $response = $this->withToken(authToken())
        ->postJson('/api/products', [
            'product_name' => '',
            'category_id' => 999999,
            'supplier_id' => 999999,
            'quantity' => -1,
            'price' => -1,
        ]);

    $response->assertStatus(422)
        ->assertJsonStructure(['message', 'errors'])
        ->assertJsonValidationErrors([
            'product_name',
            'category_id',
            'supplier_id',
            'quantity',
            'price',
        ]);
});

test('Week 8 supplier validation returns inline-ready 422 data', function () {
    $response = $this->withToken(authToken())
        ->postJson('/api/suppliers', [
            'supplier_name' => '',
            'email' => 'not-an-email',
        ]);

    $response->assertStatus(422)
        ->assertJsonStructure(['message', 'errors'])
        ->assertJsonValidationErrors([
            'supplier_name',
            'email',
        ]);
});

test('Week 8 category validation returns inline-ready 422 data', function () {
    $response = $this->withToken(authToken())
        ->postJson('/api/categories', [
            'category_name' => '',
        ]);

    $response->assertStatus(422)
        ->assertJsonStructure(['message', 'errors'])
        ->assertJsonValidationErrors(['category_name']);
});

test('Week 8 missing product returns a clear 404 contract', function () {
    $response = $this->withToken(authToken())
        ->getJson('/api/products/999999');

    $response->assertStatus(404)
        ->assertJson([
            'status' => 'error',
            'error' => 'Product not found',
        ]);
});

test('Week 8 missing supplier returns a clear 404 contract', function () {
    $response = $this->withToken(authToken())
        ->putJson('/api/suppliers/999999', [
            'supplier_name' => 'Missing Supplier',
        ]);

    $response->assertStatus(404)
        ->assertJson([
            'status' => 'error',
            'error' => 'Supplier not found',
        ]);
});

test('Week 8 missing category returns a clear 404 contract', function () {
    $response = $this->withToken(authToken())
        ->putJson('/api/categories/999999', [
            'category_name' => 'Missing Category',
        ]);

    $response->assertStatus(404)
        ->assertJson([
            'status' => 'error',
            'error' => 'Category not found',
        ]);
});

test('Week 8 prevents destructive category deletion when products are linked', function () {
    $category = Category::create([
        'category_name' => 'Week 8 Linked Category',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Week 8 Supplier',
        'contact_number' => '09123456789',
    ]);

    Product::create([
        'product_name' => 'Week 8 Linked Product',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 5,
        'price' => 100,
    ]);

    $response = $this->withToken(authToken())
        ->deleteJson('/api/categories/' . $category->category_id);

    $response->assertStatus(409)
        ->assertJson([
            'status' => 'error',
            'error' => 'Category cannot be deleted while products are linked to it.',
        ]);
});

test('Week 8 frontend feedback contract is present', function () {
    $js = file_get_contents(base_path('public/app.js'));
    $html = file_get_contents(base_path('public/index.html'));

    expect($js)->toContain('error.status === 422')
        ->toContain('showFormErrors')
        ->toContain('error.status === 404')
        ->toContain('error.status >= 500')
        ->toContain('isNetworkError')
        ->toContain('Connection Problem')
        ->toContain('Record Not Found')
        ->toContain('Server Error')
        ->toContain('showApiFailureToast')
        ->toContain('Try Again')
        ->toContain('setFormBusy')
        ->toContain('confirm(')
        ->toContain('showErrorState');

    expect($html)->toContain('id="loading-state-template"')
        ->toContain('id="error-state-template"')
        ->toContain('ui-state-retry');
});
