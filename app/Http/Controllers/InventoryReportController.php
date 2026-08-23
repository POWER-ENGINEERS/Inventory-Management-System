<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InventoryReportController extends Controller
{
    public function showInventoryReport()
    {
        return response()->json([
            'message' => 'showInventoryReport stub'
        ], 200);
    }

    public function export()
    {
        return response()->json([
            'message' => 'export stub'
        ], 200);
    }
}