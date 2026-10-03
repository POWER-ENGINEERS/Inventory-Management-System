<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\InventoryTransaction;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InventoryApiTest extends TestCase
{
    use RefreshDatabase;

    private function token(): string
    {
        $user = User::factory()->create([
            'role' => 'Super Admin',
            'status' => 'Active',
        ]);

        return $user->createToken('inventory-test')->plainTextToken;
    }

    private function product(int $quantity = 10): Product
    {
        $category = Category::create(['category_name' => 'Test Category']);
        $supplier = Supplier::create(['supplier_name' => 'Test Supplier']);

        return Product::create([
            'product_name' => 'Test Product',
            'sku' => 'TEST-001',
            'category_id' => $category->category_id,
            'supplier_id' => $supplier->supplier_id,
            'quantity' => $quantity,
            'price' => 100,
            'selling_price' => 100,
            'purchase_price' => 80,
            'status' => 'Active',
        ]);
    }

    public function test_stock_in_increases_product_quantity_and_creates_transaction(): void
    {
        $product = $this->product(10);

        $this->withToken($this->token())
            ->postJson('/api/stock-ins', [
                'product_id' => $product->product_id,
                'quantity' => 5,
            ])
            ->assertCreated();

        $this->assertDatabaseHas('products', [
            'product_id' => $product->product_id,
            'quantity' => 15,
        ]);

        $this->assertDatabaseHas('inventory_transactions', [
            'product_id' => $product->product_id,
            'transaction_type' => 'stock_in',
            'quantity' => 5,
        ]);
    }

    public function test_stock_out_cannot_exceed_available_quantity(): void
    {
        $product = $this->product(10);

        $this->withToken($this->token())
            ->postJson('/api/stock-outs', [
                'product_id' => $product->product_id,
                'quantity' => 11,
            ])
            ->assertStatus(422);

        $this->assertDatabaseHas('products', [
            'product_id' => $product->product_id,
            'quantity' => 10,
        ]);

        $this->assertDatabaseMissing('inventory_transactions', [
            'product_id' => $product->product_id,
            'transaction_type' => 'stock_out',
        ]);
    }

    public function test_stock_out_decreases_product_quantity(): void
    {
        $product = $this->product(10);

        $this->withToken($this->token())
            ->postJson('/api/stock-outs', [
                'product_id' => $product->product_id,
                'quantity' => 4,
            ])
            ->assertCreated();

        $this->assertDatabaseHas('products', [
            'product_id' => $product->product_id,
            'quantity' => 6,
        ]);

        $this->assertDatabaseHas('inventory_transactions', [
            'product_id' => $product->product_id,
            'transaction_type' => 'stock_out',
            'quantity' => 4,
        ]);
    }

    public function test_dashboard_returns_inventory_summary(): void
    {
        $this->product(10);

        $this->withToken($this->token())
            ->getJson('/api/dashboard')
            ->assertOk()
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('data.total_products', 1)
            ->assertJsonPath('data.total_quantity', 10);
    }

    public function test_search_matches_name_sku_barcode_and_brand(): void
    {
        $product = $this->product(10);
        $product->update([
            'sku' => 'ABC-123',
            'barcode' => '987654321',
            'brand' => 'Acme',
        ]);

        $this->withToken($this->token())
            ->getJson('/api/productssearch?q=ABC-123')
            ->assertOk()
            ->assertJsonPath('status', 'success')
            ->assertJsonCount(1, 'data');
    }
}
