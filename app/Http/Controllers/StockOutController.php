<?php

namespace App\Http\Controllers;

use App\Models\InventoryTransaction;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StockOutController extends Controller
{
    public function listStockOuts()
    {
        $stockOuts = InventoryTransaction::where('transaction_type', 'stock_out')
            ->with('product')
            ->orderByDesc('transaction_date')
            ->get();

        return response()->json($stockOuts);
    }

    public function createStockOut(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,product_id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($validated['product_id']);

        if ($product->quantity < $validated['quantity']) {
            return response()->json([
                'status' => 'error',
                'error' => 'Insufficient stock',
                'field' => 'quantity',
            ], 422);
        }

        $stockOut = DB::transaction(function () use ($validated, $product) {
            $product->decrement('quantity', $validated['quantity']);

            return InventoryTransaction::create([
                'product_id' => $product->product_id,
                'transaction_type' => 'stock_out',
                'quantity' => $validated['quantity'],
                'transaction_date' => now(),
            ]);
        });

        return response()->json([
            'status' => 'success',
            'data' => [
                'message' => 'Stock out recorded successfully',
                'transaction' => $stockOut,
            ],
        ], 201);
    }
}