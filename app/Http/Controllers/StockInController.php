<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StockInController extends Controller
{
    public function listStockIns()
    {
        return response()->json([
            'message' => 'listStockIns stub'
        ], 200);
    }

    public function createStockIn()
    {
        return response()->json([
            'message' => 'createStockIn stub'
        ], 201);
    }
}