<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function listProducts()
    {
        return response()->json([
            'status' => 'success',
            'data' => Product::all(),
        ], 200);
    }

    public function showProduct($id)
    {
        $product = Product::with([
            'supplier',
            'inventoryTransactions'
        ])->find($id);

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'error' => 'Product not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $product,
        ], 200);
    }

    public function createProduct(Request $request)
    {
        $validated = $request->validate([
            'product_name' => 'sometimes|required|string|max:255',
            'category_id' => 'required|exists:categories,category_id',
            'supplier_id' => 'required|exists:suppliers,supplier_id',
            'quantity' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
        ]);

        $product = Product::create($validated);

        return response()->json([
            'status' => 'success',
            'data' => $product,
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

        $validated = $request->validate([
            'product_name' => 'sometimes|string|max:255',
            'category_id' => 'sometimes|exists:categories,category_id',
            'supplier_id' => 'sometimes|exists:suppliers,supplier_id',
            'quantity' => 'sometimes|integer|min:0',
            'price' => 'sometimes|numeric|min:0',
        ]);

        $product->update($validated);

        return response()->json([
            'status' => 'success',
            'data' => $product,
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
            'data' => [
                'message' => 'Product deleted successfully',
            ],
        ], 200);
    }
}