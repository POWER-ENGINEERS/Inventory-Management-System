<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StockOutController extends Controller
{
    public function listStockOuts()
    {
        return response()->json([
            'message' => 'listStockOuts stub'
        ], 200);
    }

    public function createStockOut()
    {
        return response()->json([
            'message' => 'createStockOut stub'
        ], 201);
    }
}