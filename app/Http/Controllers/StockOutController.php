<?php

namespace App\Http\Controllers;

use App\Models\InventoryTransaction;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StockOutController extends Controller
{
    /**
     * Display all stock-out transactions.
     */
    public function listStockOuts()
    {
        $stockOuts = InventoryTransaction::where('transaction_type', 'stock_out')
            ->with('product')
            ->orderByDesc('transaction_date')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $stockOuts,
        ]);
    }

    /**
     * Display a specific stock-out transaction.
     */
    public function showStockOut($id)
    {
        $stockOut = InventoryTransaction::where('transaction_type', 'stock_out')
            ->with('product')
            ->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $stockOut,
        ]);
    }

    /**
     * Create a new stock-out transaction.
     */
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

    /**
     * Update an existing stock-out transaction.
     */
    public function updateStockOut(Request $request, $id)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,product_id',
            'quantity' => 'required|integer|min:1',
        ]);

        $stockOut = DB::transaction(function () use ($validated, $id) {
            $stockOut = InventoryTransaction::where('transaction_type', 'stock_out')
                ->findOrFail($id);

            $oldProduct = Product::findOrFail($stockOut->product_id);
            $newProduct = Product::findOrFail($validated['product_id']);

            if ($oldProduct->product_id == $newProduct->product_id) {
                $difference = $validated['quantity'] - $stockOut->quantity;

                if ($difference > 0) {
                    if ($oldProduct->quantity < $difference) {
                        abort(response()->json([
                            'status' => 'error',
                            'error' => 'Insufficient stock',
                            'field' => 'quantity',
                        ], 422));
                    }

                    $oldProduct->decrement('quantity', $difference);
                } elseif ($difference < 0) {
                    $oldProduct->increment('quantity', abs($difference));
                }
            } else {
                if ($newProduct->quantity < $validated['quantity']) {
                    abort(response()->json([
                        'status' => 'error',
                        'error' => 'Insufficient stock',
                        'field' => 'quantity',
                    ], 422));
                }

                $oldProduct->increment('quantity', $stockOut->quantity);
                $newProduct->decrement('quantity', $validated['quantity']);
            }

            $stockOut->update([
                'product_id' => $newProduct->product_id,
                'quantity' => $validated['quantity'],
            ]);

            return $stockOut->fresh();
        });

        return response()->json([
            'status' => 'success',
            'data' => $stockOut,
        ]);
    }

    /**
     * Delete an existing stock-out transaction.
     */
    public function deleteStockOut($id)
    {
        $stockOut = InventoryTransaction::where('transaction_type', 'stock_out')
            ->findOrFail($id);

        DB::transaction(function () use ($stockOut) {
            $product = Product::findOrFail($stockOut->product_id);

            $product->increment('quantity', $stockOut->quantity);

            $stockOut->delete();
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Stock-out deleted successfully',
        ]);
    }
}
