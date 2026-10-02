<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    private function present(Supplier $supplier): array
    {
        return [
            'supplier_id' => $supplier->supplier_id,
            'supplier_name' => $supplier->supplier_name,
            'contact_person' => $supplier->contact_person,
            'contact_number' => $supplier->contact_number,
            'phone' => $supplier->phone,
            'email' => $supplier->email,
            'address' => $supplier->address,
            // Existing frontend-compatible names.
            'id' => (string) $supplier->supplier_id,
            'company' => $supplier->supplier_name,
            'contact' => $supplier->contact_person ?? '',
        ];
    }

    public function listSuppliers()
    {
        $suppliers = Supplier::withCount('products')
            ->orderBy('supplier_name')
            ->get()
            ->map(fn (Supplier $supplier) => $this->present($supplier) + [
                'product_count' => $supplier->products_count,
            ]);

        return response()->json([
            'status' => 'success',
            'data' => $suppliers,
        ], 200);
    }

    public function showSupplier($id)
    {
        $supplier = Supplier::withCount('products')->find($id);

        if (!$supplier) {
            return response()->json([
                'status' => 'error',
                'error' => 'Supplier not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $this->present($supplier) + [
                'product_count' => $supplier->products_count,
            ],
        ], 200);
    }

    public function createSupplier(Request $request)
    {
        $validated = $this->validateSupplier($request, true);
        $supplier = Supplier::create($validated);

        return response()->json([
            'status' => 'success',
            'data' => $this->present($supplier),
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

        $validated = $this->validateSupplier($request, false);
        $supplier->update($validated);

        return response()->json([
            'status' => 'success',
            'data' => $this->present($supplier),
        ], 200);
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

        if ($supplier->products()->exists()) {
            return response()->json([
                'status' => 'error',
                'error' => 'Supplier cannot be deleted while products are linked to it.',
            ], 409);
        }

        $supplier->delete();

        return response()->json([
            'status' => 'success',
            'data' => ['message' => 'Supplier deleted successfully'],
        ], 200);
    }

    private function validateSupplier(Request $request, bool $creating): array
    {
        $data = $request->all();

        if (isset($data['company']) && !isset($data['supplier_name'])) {
            $data['supplier_name'] = $data['company'];
        }
        if (isset($data['contact']) && !isset($data['contact_person'])) {
            $data['contact_person'] = $data['contact'];
        }
        if (isset($data['phone']) && !isset($data['contact_number'])) {
            $data['contact_number'] = $data['phone'];
        }

        $rules = [
            'supplier_name' => ($creating ? 'required' : 'sometimes') . '|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'contact_number' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
        ];

        return validator($data, $rules)->validate();
    }
}
