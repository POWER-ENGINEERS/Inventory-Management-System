<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function listSuppliers()
    {
        return response()->json([
            'message' => 'listSuppliers stub'
        ], 200);
    }

    public function createSupplier()
    {
        return response()->json([
            'message' => 'createSupplier stub'
        ], 201);
    }

    public function updateSupplier($id)
    {
        return response()->json([
            'message' => 'updateSupplier stub',
            'id' => $id
        ], 200);
    }

    public function deleteSupplier($id)
    {
        return response()->json([
            'message' => 'deleteSupplier stub',
            'id' => $id
        ], 200);
    }
}