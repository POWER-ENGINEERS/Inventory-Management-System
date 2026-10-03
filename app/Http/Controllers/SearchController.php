<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function searchProducts(Request $request)
    {
        $search = trim((string) $request->query('search', $request->query('q', '')));

        $products = Product::with(['category','supplier'])
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('product_name','like',"%{$search}%")
                        ->orWhere('sku','like',"%{$search}%")
                        ->orWhere('barcode','like',"%{$search}%")
                        ->orWhere('brand','like',"%{$search}%");
                });
            })
            ->orderBy('product_name')
            ->limit(100)
            ->get();

        return response()->json(['status'=>'success','data'=>$products]);
    }
}
