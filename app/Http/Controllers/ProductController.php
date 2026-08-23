<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function listProducts()
    {
        return response()->json([
            'message' => 'listProducts stub'
        ], 200);
    }

    public function showProduct($id)
    {
        return response()->json([
            'message' => 'showProduct stub',
            'id' => $id
        ], 200);
    }

    public function createProduct()
    {
        return response()->json([
            'message' => 'createProduct stub'
        ], 201);
    }

    public function updateProduct($id)
    {
        return response()->json([
            'message' => 'updateProduct stub',
            'id' => $id
        ], 200);
    }

    public function deleteProduct($id)
    {
        return response()->json([
            'message' => 'deleteProduct stub',
            'id' => $id
        ], 200);
    }
}