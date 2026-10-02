<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private function present(Product $product): array
    {
        return [
            'product_id' => $product->product_id,
            'product_name' => $product->product_name,
            'sku' => $product->sku,
            'barcode' => $product->barcode,
            'category_id' => $product->category_id,
            'brand' => $product->brand,
            'supplier_id' => $product->supplier_id,
            'quantity' => $product->quantity,
            'unit' => $product->unit,
            'price' => $product->price,
            'purchase_price' => $product->purchase_price,
            'selling_price' => $product->selling_price,
            'expiration' => $product->expiration?->format('Y-m-d'),
            'description' => $product->description,
            'image' => $product->image,
            'status' => $product->status,
            'category' => $product->category,
            'supplier' => $product->supplier,
            // Frontend-compatible aliases; nothing in the existing UI has to be removed.
            'id' => (string) $product->product_id,
            'name' => $product->product_name,
            'SKU' => $product->sku ?? '',
            'qty' => $product->quantity,
            'purchasePrice' => (float) $product->purchase_price,
            'sellingPrice' => (float) $product->selling_price,
            'categoryKey' => (string) $product->category_id,
            'supplierKey' => (string) $product->supplier_id,
        ];
    }

    public function listProducts()
    {
        $products = Product::with(['category', 'supplier', 'inventoryTransactions'])
            ->orderBy('product_id')
            ->get()
            ->map(fn (Product $product) => $this->present($product));

        return response()->json([
            'status' => 'success',
            'data' => $products,
        ], 200);
    }

    public function showProduct($id)
    {
        $product = Product::with(['category', 'supplier', 'inventoryTransactions'])->find($id);

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'error' => 'Product not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $this->present($product),
        ], 200);
    }

    public function createProduct(Request $request)
    {
        $validated = $this->validateProduct($request, true);
        $product = Product::create($validated);

        return response()->json([
            'status' => 'success',
            'data' => $this->present($product->fresh(['category', 'supplier', 'inventoryTransactions'])),
        ], 201);
    }

    public function updateProduct(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'error' => 'Product not found',
            ], 404);
        }

        $validated = $this->validateProduct($request, false);
        $product->update($validated);

        return response()->json([
            'status' => 'success',
            'data' => $this->present($product->fresh(['category', 'supplier', 'inventoryTransactions'])),
        ], 200);
    }

    public function deleteProduct($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'error' => 'Product not found',
            ], 404);
        }

        $product->delete();

        return response()->json([
            'status' => 'success',
            'data' => ['message' => 'Product deleted successfully'],
        ], 200);
    }

    private function validateProduct(Request $request, bool $creating): array
    {
        $data = $request->all();

        // Accept the existing frontend names as well as the original API names.
        if (isset($data['name']) && !isset($data['product_name'])) {
            $data['product_name'] = $data['name'];
        }
        if (isset($data['SKU']) && !isset($data['sku'])) {
            $data['sku'] = $data['SKU'];
        }
        if (isset($data['qty']) && !isset($data['quantity'])) {
            $data['quantity'] = $data['qty'];
        }
        if (isset($data['category']) && !isset($data['category_id'])) {
            $data['category_id'] = $data['category'];
        }
        if (isset($data['supplier']) && !isset($data['supplier_id'])) {
            $data['supplier_id'] = $data['supplier'];
        }
        if (isset($data['purchasePrice']) && !isset($data['purchase_price'])) {
            $data['purchase_price'] = $data['purchasePrice'];
        }
        if (isset($data['sellingPrice']) && !isset($data['selling_price'])) {
            $data['selling_price'] = $data['sellingPrice'];
        }

        if (!isset($data['price']) && isset($data['selling_price'])) {
            $data['price'] = $data['selling_price'];
        }
        if (!isset($data['selling_price']) && isset($data['price'])) {
            $data['selling_price'] = $data['price'];
        }

        $rules = [
            'product_name' => ($creating ? 'required' : 'sometimes') . '|string|max:255',
            'sku' => 'nullable|string|max:255',
            'barcode' => 'nullable|string|max:255',
            'category_id' => ($creating ? 'required' : 'sometimes') . '|exists:categories,category_id',
            'brand' => 'nullable|string|max:255',
            'supplier_id' => ($creating ? 'required' : 'sometimes') . '|exists:suppliers,supplier_id',
            'quantity' => ($creating ? 'required' : 'sometimes') . '|integer|min:0',
            'unit' => 'nullable|string|max:50',
            'price' => ($creating ? 'required' : 'sometimes') . '|numeric|min:0',
            'purchase_price' => 'nullable|numeric|min:0',
            'selling_price' => 'nullable|numeric|min:0',
            'expiration' => 'nullable|date',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'status' => 'nullable|in:Active,Archived',
        ];

        $validated = validator($data, $rules)->validate();

        if (array_key_exists('selling_price', $validated)) {
            $validated['price'] = $validated['selling_price'];
        }

        return $validated;
    }
}
