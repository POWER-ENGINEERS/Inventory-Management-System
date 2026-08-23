<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function searchProducts()
    {
        return response()->json([
            'message' => 'searchProducts stub'
        ], 200);
    }
}