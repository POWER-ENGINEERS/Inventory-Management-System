<?php

namespace App\Http\Controllers;

use App\Models\InventoryTransaction;
use App\Models\Product;
use Symfony\Component\HttpFoundation\StreamedResponse;

class InventoryReportController extends Controller
{
    public function showInventoryReport()
    {
        $products = Product::with(['category','supplier'])->orderBy('product_name')->get();

        return response()->json([
            'status'=>'success',
            'data'=>[
                'generated_at'=>now()->toISOString(),
                'total_products'=>$products->count(),
                'total_quantity'=>(int)$products->sum('quantity'),
                'total_inventory_value'=>$products->sum(fn ($product) => $product->quantity * $product->price),
                'low_stock_count'=>$products->where('quantity','<=',10)->count(),
                'products'=>$products,
                'recent_transactions'=>InventoryTransaction::with('product')
                    ->orderByDesc('transaction_date')
                    ->limit(100)
                    ->get(),
            ],
        ]);
    }

    public function export(): StreamedResponse
    {
        $filename='inventory-report-'.now()->format('Y-m-d_H-i-s').'.csv';

        return response()->streamDownload(function () {
            $handle=fopen('php://output','w');
            fputcsv($handle,['Product ID','Product Name','SKU','Category','Supplier','Quantity','Price','Inventory Value','Status']);

            Product::with(['category','supplier'])->orderBy('product_name')->chunk(500, function ($products) use ($handle) {
                foreach ($products as $product) {
                    fputcsv($handle,[
                        $product->product_id,
                        $product->product_name,
                        $product->sku,
                        $product->category?->category_name,
                        $product->supplier?->supplier_name,
                        $product->quantity,
                        $product->price,
                        $product->quantity * $product->price,
                        $product->status,
                    ]);
                }
            });

            fclose($handle);
        }, $filename, ['Content-Type'=>'text/csv; charset=UTF-8']);
    }
}
