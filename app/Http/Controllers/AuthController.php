<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login()
    {
        return response()->json([
            'message' => 'login stub'
        ], 200);
    }

    public function logout()
    {
        return response()->json([
            'message' => 'logout stub'
        ], 200);
    }
}