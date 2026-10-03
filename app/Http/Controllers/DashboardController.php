<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\InventoryTransaction;
use App\Models\Product;
use App\Models\Supplier;

class DashboardController extends Controller
{
    public function showDashboard()
    {
        return response()->json([
            'status'=>'success',
            'data'=>[
                'total_products'=>Product::count(),
                'total_categories'=>Category::count(),
                'total_suppliers'=>Supplier::count(),
                'total_quantity'=>(int) Product::sum('quantity'),
                'low_stock_count'=>Product::where('quantity','<=',10)->count(),
                'low_stock_products'=>Product::where('quantity','<=',10)
                    ->orderBy('quantity')
                    ->get(),
                'stock_in_count'=>InventoryTransaction::where('transaction_type','stock_in')->count(),
                'stock_out_count'=>InventoryTransaction::where('transaction_type','stock_out')->count(),
                'recent_activities'=>InventoryTransaction::with('product')
                    ->orderByDesc('transaction_date')
                    ->limit(10)
                    ->get(),
            ],
        ]);
    }
}
