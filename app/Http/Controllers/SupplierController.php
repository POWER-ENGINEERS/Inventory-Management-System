<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function listSuppliers()
    {
        return response()->json([
            'status' => 'success',
            'data' => Supplier::all(),
        ]);
    }

    public function createSupplier(Request $request)
    {
        $validated = $request->validate([
            'supplier_name' => 'required|string|max:255',
            'contact_number' => 'nullable|string|max:255',
        ]);

        $supplier = Supplier::create($validated);

        return response()->json([
            'status' => 'success',
            'data' => $supplier,
        ], 201);
    }

    public function updateSupplier(Request $request, $id)
    {
        $supplier = Supplier::find($id);

        if (!$supplier) {
            return response()->json([
                'status' => 'error',
                'error' => 'Supplier not found',
            ], 404);
        }

        $validated = $request->validate([
            'supplier_name' => 'sometimes|string|max:255',
            'contact_number' => 'sometimes|string|max:255',
        ]);

        $supplier->update($validated);

        return response()->json([
            'status' => 'success',
            'data' => $supplier,
        ]);
    }

    public function deleteSupplier($id)
    {
        $supplier = Supplier::find($id);

        if (!$supplier) {
            return response()->json([
                'status' => 'error',
                'error' => 'Supplier not found',
            ], 404);
        }

        $supplier->delete();

        return response()->json([
            'status' => 'success',
            'data' => [
                'message' => 'Supplier deleted successfully',
            ],
        ]);
    }
}