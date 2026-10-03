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
        return response()->json([
            'status'=>'success',
            'data'=>InventoryTransaction::with('product')
                ->where('transaction_type','stock_out')
                ->orderByDesc('transaction_date')
                ->get(),
        ]);
    }

    public function showStockOut($id)
    {
        $stockOut = InventoryTransaction::with('product')
            ->where('transaction_type','stock_out')
            ->find($id);

        if (!$stockOut) {
            return response()->json(['status'=>'error','error'=>'Stock-out transaction not found'], 404);
        }

        return response()->json(['status'=>'success','data'=>$stockOut]);
    }

    public function createStockOut(Request $request)
    {
        $data = $request->validate([
            'product_id'=>['required','exists:products,product_id'],
            'quantity'=>['required','integer','min:1'],
            'transaction_date'=>['nullable','date'],
        ]);

        $stockOut = DB::transaction(function () use ($data) {
            $product = Product::lockForUpdate()->findOrFail($data['product_id']);

            if ($product->quantity < $data['quantity']) {
                abort(response()->json(['status'=>'error','error'=>'Insufficient stock.','field'=>'quantity'], 422));
            }

            $product->decrement('quantity', $data['quantity']);

            return InventoryTransaction::create([
                'product_id'=>$product->product_id,
                'transaction_type'=>'stock_out',
                'quantity'=>$data['quantity'],
                'transaction_date'=>$data['transaction_date'] ?? now(),
            ]);
        });

        return response()->json([
            'status'=>'success',
            'data'=>['message'=>'Stock out recorded successfully','transaction'=>$stockOut->load('product')],
        ], 201);
    }

    public function updateStockOut(Request $request, $id)
    {
        $data = $request->validate([
            'product_id'=>['required','exists:products,product_id'],
            'quantity'=>['required','integer','min:1'],
            'transaction_date'=>['nullable','date'],
        ]);

        $stockOut = DB::transaction(function () use ($data, $id) {
            $transaction = InventoryTransaction::where('transaction_type','stock_out')->lockForUpdate()->find($id);
            if (!$transaction) {
                abort(response()->json(['status'=>'error','error'=>'Stock-out transaction not found'], 404));
            }

            $oldProduct = Product::lockForUpdate()->findOrFail($transaction->product_id);
            $newProduct = Product::lockForUpdate()->findOrFail($data['product_id']);

            if ($oldProduct->product_id === $newProduct->product_id) {
                $difference = $data['quantity'] - $transaction->quantity;
                if ($difference > 0) {
                    if ($oldProduct->quantity < $difference) {
                        abort(response()->json(['status'=>'error','error'=>'Insufficient stock.','field'=>'quantity'], 422));
                    }
                    $oldProduct->decrement('quantity', $difference);
                } elseif ($difference < 0) {
                    $oldProduct->increment('quantity', abs($difference));
                }
            } else {
                if ($newProduct->quantity < $data['quantity']) {
                    abort(response()->json(['status'=>'error','error'=>'Insufficient stock for the updated transaction.','field'=>'quantity'], 422));
                }
                $oldProduct->increment('quantity', $transaction->quantity);
                $newProduct->decrement('quantity', $data['quantity']);
            }

            $transaction->update([
                'product_id'=>$newProduct->product_id,
                'quantity'=>$data['quantity'],
                'transaction_date'=>$data['transaction_date'] ?? $transaction->transaction_date,
            ]);

            return $transaction->fresh('product');
        });

        return response()->json(['status'=>'success','data'=>$stockOut]);
    }

    public function deleteStockOut($id)
    {
        DB::transaction(function () use ($id) {
            $transaction = InventoryTransaction::where('transaction_type','stock_out')->lockForUpdate()->find($id);
            if (!$transaction) {
                abort(response()->json(['status'=>'error','error'=>'Stock-out transaction not found'], 404));
            }

            Product::lockForUpdate()->findOrFail($transaction->product_id)
                ->increment('quantity', $transaction->quantity);

            $transaction->delete();
        });

        return response()->json(['status'=>'success','message'=>'Stock-out deleted successfully']);
    }
}
