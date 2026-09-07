<?php

namespace App\Http\Controllers;

use App\Models\InventoryTransaction;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StockInController extends Controller
{
    /**
     * Display a list of all stock-in transactions.
     */
    public function listStockIns()
    {
        $stockIns = InventoryTransaction::where('transaction_type', 'stock_in')
            ->with('product')
            ->orderByDesc('transaction_date')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $stockIns,
        ]);
    }

    /**
     * Display a specific stock-in transaction.
     */
    public function showStockIn($id)
    {
        $stockIn = InventoryTransaction::where('transaction_type', 'stock_in')
            ->with('product')
            ->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $stockIn,
        ]);
    }

    /**
     * Create a new stock-in transaction.
     */
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
            'status' => 'success',
            'data' => [
                'message' => 'Stock in recorded successfully',
                'transaction' => $stockIn,
            ],
        ], 201);
    }

    /**
     * Update an existing stock-in transaction.
     */
    public function updateStockIn(Request $request, $id)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,product_id',
            'quantity' => 'required|integer|min:1',
        ]);

        $stockIn = DB::transaction(function () use ($validated, $id) {
            $stockIn = InventoryTransaction::where('transaction_type', 'stock_in')
                ->findOrFail($id);

            $oldProduct = Product::findOrFail($stockIn->product_id);
            $newProduct = Product::findOrFail($validated['product_id']);

            if ($oldProduct->product_id == $newProduct->product_id) {
                $difference = $validated['quantity'] - $stockIn->quantity;

                if ($difference > 0) {
                    $oldProduct->increment('quantity', $difference);
                } elseif ($difference < 0) {
                    $oldProduct->decrement('quantity', abs($difference));
                }
            } else {
                $oldProduct->decrement('quantity', $stockIn->quantity);
                $newProduct->increment('quantity', $validated['quantity']);
            }

            $stockIn->update([
                'product_id' => $newProduct->product_id,
                'quantity' => $validated['quantity'],
            ]);

            return $stockIn->fresh();
        });

        return response()->json([
            'status' => 'success',
            'data' => $stockIn,
        ]);
    }

    /**
     * Delete an existing stock-in transaction.
     */
    public function deleteStockIn($id)
    {
        $stockIn = InventoryTransaction::where('transaction_type', 'stock_in')
            ->findOrFail($id);

        DB::transaction(function () use ($stockIn) {
            $product = Product::findOrFail($stockIn->product_id);

            $product->decrement('quantity', $stockIn->quantity);

            $stockIn->delete();
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Stock-in deleted successfully',
        ]);
    }
}
