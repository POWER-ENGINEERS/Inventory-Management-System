<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function showDashboard()
    {
        return response()->json([
            'message' => 'showDashboard stub'
        ], 200);
    }
}