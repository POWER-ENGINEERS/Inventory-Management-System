<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class InventoryReportController extends Controller
{
    public function showInventoryReport()
    {
        $products = Product::orderBy('product_name')->get();

        return response()->json([
            'total_products' => $products->count(),
            'total_quantity' => $products->sum('quantity'),
            'total_inventory_value' => $products->sum(
                fn ($product) => $product->quantity * $product->price
            ),
            'products' => $products,
        ]);
    }

    public function export()
    {
        $products = Product::orderBy('product_name')->get();

        $csv = "Product ID,Product Name,Quantity,Price,Inventory Value\n";

        foreach ($products as $product) {
            $inventoryValue = $product->quantity * $product->price;

            $csv .= sprintf(
                "%d,%s,%d,%.2f,%.2f\n",
                $product->product_id,
                str_replace(',', '', $product->product_name),
                $product->quantity,
                $product->price,
                $inventoryValue
            );
        }

        return response($csv, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="inventory-report.csv"',
        ]);
    }
}