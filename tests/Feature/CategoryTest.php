<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('category can be created, updated, listed, and deleted', function () {
    $token = authToken();

    $created = $this->withToken($token)
        ->postJson('/api/categories', [
            'category_name' => 'Christian QA Category',
            'description' => 'Category lifecycle coverage',
        ]);

    $created->assertCreated()
        ->assertJsonPath('data.category_name', 'Christian QA Category');

    $categoryId = $created->json('data.category_id');

    $this->withToken($token)
        ->getJson('/api/categories')
        ->assertOk()
        ->assertJsonFragment([
            'category_id' => $categoryId,
            'category_name' => 'Christian QA Category',
        ]);

    $this->withToken($token)
        ->putJson('/api/categories/' . $categoryId, [
            'category_name' => 'Christian QA Category Updated',
        ])
        ->assertOk()
        ->assertJsonPath('data.category_name', 'Christian QA Category Updated');

    $this->assertDatabaseHas('categories', [
        'category_id' => $categoryId,
        'category_name' => 'Christian QA Category Updated',
    ]);

    $this->withToken($token)
        ->deleteJson('/api/categories/' . $categoryId)
        ->assertOk()
        ->assertJsonPath('data.message', 'Category deleted successfully');

    $this->assertDatabaseMissing('categories', [
        'category_id' => $categoryId,
    ]);
});

test('category update returns 404 for a missing category', function () {
    $response = $this->withToken(authToken())
        ->putJson('/api/categories/99999', [
            'category_name' => 'Missing Category',
        ]);

    $response->assertStatus(404)
        ->assertJson([
            'status' => 'error',
            'error' => 'Category not found',
        ]);
});

test('category deletion preserves linked products when deletion is rejected', function () {
    $category = Category::create([
        'category_name' => 'Christian Linked Category',
    ]);

    $supplier = Supplier::create([
        'supplier_name' => 'Christian Category Supplier',
    ]);

    $product = Product::create([
        'product_name' => 'Christian Linked Product',
        'category_id' => $category->category_id,
        'supplier_id' => $supplier->supplier_id,
        'quantity' => 4,
        'price' => 100,
    ]);

    $response = $this->withToken(authToken())
        ->deleteJson('/api/categories/' . $category->category_id);

    $response->assertStatus(409)
        ->assertJsonPath('status', 'error');

    $this->assertDatabaseHas('products', [
        'product_id' => $product->product_id,
        'category_id' => $category->category_id,
    ]);

    $this->assertDatabaseHas('categories', [
        'category_id' => $category->category_id,
    ]);
});
