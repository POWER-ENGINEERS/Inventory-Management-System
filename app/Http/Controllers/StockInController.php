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
        return response()->json([
            'status' => 'success',
            'data' => InventoryTransaction::with('product')
                ->where('transaction_type', 'stock_in')
                ->orderByDesc('transaction_date')
                ->get(),
        ]);
    }

    public function showStockIn($id)
    {
        $stockIn = InventoryTransaction::with('product')
            ->where('transaction_type', 'stock_in')
            ->find($id);

        if (!$stockIn) {
            return response()->json(['status'=>'error','error'=>'Stock-in transaction not found'], 404);
        }

        return response()->json(['status'=>'success','data'=>$stockIn]);
    }

    public function createStockIn(Request $request)
    {
        $data = $request->validate([
            'product_id' => ['required','exists:products,product_id'],
            'quantity' => ['required','integer','min:1'],
            'transaction_date' => ['nullable','date'],
        ]);

        $stockIn = DB::transaction(function () use ($data) {
            $product = Product::lockForUpdate()->findOrFail($data['product_id']);
            $product->increment('quantity', $data['quantity']);

            return InventoryTransaction::create([
                'product_id' => $product->product_id,
                'transaction_type' => 'stock_in',
                'quantity' => $data['quantity'],
                'transaction_date' => $data['transaction_date'] ?? now(),
            ]);
        });

        return response()->json([
            'status'=>'success',
            'data'=>['message'=>'Stock in recorded successfully','transaction'=>$stockIn->load('product')],
        ], 201);
    }

    public function updateStockIn(Request $request, $id)
    {
        $data = $request->validate([
            'product_id' => ['required','exists:products,product_id'],
            'quantity' => ['required','integer','min:1'],
            'transaction_date' => ['nullable','date'],
        ]);

        $stockIn = DB::transaction(function () use ($data, $id) {
            $transaction = InventoryTransaction::where('transaction_type','stock_in')->lockForUpdate()->find($id);
            if (!$transaction) {
                abort(response()->json(['status'=>'error','error'=>'Stock-in transaction not found'], 404));
            }

            $oldProduct = Product::lockForUpdate()->findOrFail($transaction->product_id);
            $newProduct = Product::lockForUpdate()->findOrFail($data['product_id']);

            if ($oldProduct->product_id === $newProduct->product_id) {
                $difference = $data['quantity'] - $transaction->quantity;
                if ($difference > 0) {
                    $oldProduct->increment('quantity', $difference);
                } elseif ($difference < 0) {
                    $decrease = abs($difference);
                    if ($oldProduct->quantity < $decrease) {
                        abort(response()->json(['status'=>'error','error'=>'Current stock cannot support reducing this transaction.'], 409));
                    }
                    $oldProduct->decrement('quantity', $decrease);
                }
            } else {
                if ($oldProduct->quantity < $transaction->quantity) {
                    abort(response()->json(['status'=>'error','error'=>'Cannot move this transaction because current stock is lower than its quantity.'], 409));
                }
                $oldProduct->decrement('quantity', $transaction->quantity);
                $newProduct->increment('quantity', $data['quantity']);
            }

            $transaction->update([
                'product_id'=>$newProduct->product_id,
                'quantity'=>$data['quantity'],
                'transaction_date'=>$data['transaction_date'] ?? $transaction->transaction_date,
            ]);

            return $transaction->fresh('product');
        });

        return response()->json(['status'=>'success','data'=>$stockIn]);
    }

    public function deleteStockIn($id)
    {
        $result = DB::transaction(function () use ($id) {
            $transaction = InventoryTransaction::where('transaction_type','stock_in')->lockForUpdate()->find($id);
            if (!$transaction) {
                abort(response()->json(['status'=>'error','error'=>'Stock-in transaction not found'], 404));
            }

            $product = Product::lockForUpdate()->findOrFail($transaction->product_id);
            if ($product->quantity < $transaction->quantity) {
                abort(response()->json(['status'=>'error','error'=>'Cannot delete this transaction because current stock is lower than the transaction quantity.'], 409));
            }

            $product->decrement('quantity', $transaction->quantity);
            $transaction->delete();

            return true;
        });

        return response()->json(['status'=>'success','data'=>['message'=>'Stock-in deleted successfully']]);
    }
}
