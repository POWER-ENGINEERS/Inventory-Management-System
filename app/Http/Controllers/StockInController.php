<?php

namespace App\Http\Controllers;

use App\Models\InventoryTransaction;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StockInController extends Controller
{
    public function listStockIns()
    {
        $stockIns = InventoryTransaction::where('transaction_type', 'stock_in')
            ->with('product')
            ->orderByDesc('transaction_date')
            ->get();

        return response()->json($stockIns);
    }

    public function createStockIn(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,product_id',
            'quantity' => 'required|integer|min:1',
        ]);

        $stockIn = DB::transaction(function () use ($validated) {
            $product = Product::findOrFail($validated['product_id']);

            $product->increment('quantity', $validated['quantity']);

            return InventoryTransaction::create([
                'product_id' => $product->product_id,
                'transaction_type' => 'stock_in',
                'quantity' => $validated['quantity'],
                'transaction_date' => now(),
            ]);
        });

        return response()->json([
            'message' => 'Stock in recorded successfully',
            'transaction' => $stockIn,
        ], 201);
    }
}