<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function listCategories()
    {
        return response()->json([
            'status' => 'success',
            'data' => Category::orderBy('category_name')->get(),
        ], 200);
    }

    public function createCategory(Request $request)
    {
        $validated = $request->validate([
            'category_name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $category = Category::create($validated);

        return response()->json([
            'status' => 'success',
            'data' => $category,
        ], 201);
    }

    public function updateCategory(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => 'error',
                'error' => 'Category not found',
            ], 404);
        }

        $validated = $request->validate([
            'category_name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
        ]);

        $category->update($validated);

        return response()->json([
            'status' => 'success',
            'data' => $category,
        ], 200);
    }

    public function deleteCategory($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => 'error',
                'error' => 'Category not found',
            ], 404);
        }

        if ($category->products()->exists()) {
            return response()->json([
                'status' => 'error',
                'error' => 'Category cannot be deleted while products are linked to it.',
            ], 409);
        }

        $category->delete();

        return response()->json([
            'status' => 'success',
            'data' => ['message' => 'Category deleted successfully'],
        ], 200);
    }
}
