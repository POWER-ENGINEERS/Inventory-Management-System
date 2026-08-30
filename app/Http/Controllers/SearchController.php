<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function searchProducts(Request $request)
    {
        $search = $request->query('search');

        $products = Product::query()
            ->when($search, function ($query) use ($search) {
                $query->where('product_name', 'like', '%' . $search . '%');
            })
            ->orderBy('product_name')
            ->get();

        return response()->json($products);
    }
}