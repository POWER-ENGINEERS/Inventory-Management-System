<?php

namespace App\Http\Controllers;

use App\Models\InventoryTransaction;
use App\Models\Product;

class DashboardController extends Controller
{
    public function showDashboard()
    {
        $totalProducts = Product::count();

        $lowStockProducts = Product::where('quantity', '<=', 10)
            ->orderBy('quantity')
            ->get();

        $recentActivities = InventoryTransaction::with('product')
            ->orderByDesc('transaction_date')
            ->limit(10)
            ->get();

        return response()->json([
            'total_products' => $totalProducts,
            'low_stock_products' => $lowStockProducts,
            'recent_activities' => $recentActivities,
        ]);
    }
}