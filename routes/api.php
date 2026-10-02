<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\InventoryReportController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\StockInController;
use App\Http\Controllers\StockOutController;

Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::get('/auth/users', [AccountController::class, 'index']);
    Route::post('/auth/users', [AccountController::class, 'store']);

    Route::get('/categories', [CategoryController::class, 'listCategories']);
    Route::post('/categories', [CategoryController::class, 'createCategory']);
    Route::put('/categories/{id}', [CategoryController::class, 'updateCategory']);
    Route::delete('/categories/{id}', [CategoryController::class, 'deleteCategory']);

    Route::get('/products', [ProductController::class, 'listProducts']);
    Route::get('/products/{id}', [ProductController::class, 'showProduct']);
    Route::post('/products', [ProductController::class, 'createProduct']);
    Route::put('/products/{id}', [ProductController::class, 'updateProduct']);
    Route::delete('/products/{id}', [ProductController::class, 'deleteProduct']);

    Route::get('/suppliers', [SupplierController::class, 'listSuppliers']);
    Route::get('/suppliers/{id}', [SupplierController::class, 'showSupplier']);
    Route::post('/suppliers', [SupplierController::class, 'createSupplier']);
    Route::put('/suppliers/{id}', [SupplierController::class, 'updateSupplier']);
    Route::delete('/suppliers/{id}', [SupplierController::class, 'deleteSupplier']);

    Route::get('/stock-ins', [StockInController::class, 'listStockIns']);
    Route::get('/stock-ins/{id}', [StockInController::class, 'showStockIn']);
    Route::post('/stock-ins', [StockInController::class, 'createStockIn']);
    Route::put('/stock-ins/{id}', [StockInController::class, 'updateStockIn']);
    Route::delete('/stock-ins/{id}', [StockInController::class, 'deleteStockIn']);

    Route::get('/stock-outs', [StockOutController::class, 'listStockOuts']);
    Route::get('/stock-outs/{id}', [StockOutController::class, 'showStockOut']);
    Route::post('/stock-outs', [StockOutController::class, 'createStockOut']);
    Route::put('/stock-outs/{id}', [StockOutController::class, 'updateStockOut']);
    Route::delete('/stock-outs/{id}', [StockOutController::class, 'deleteStockOut']);

    Route::get('/reports/inventory', [InventoryReportController::class, 'showInventoryReport']);
    Route::get('/reports/inventory/export', [InventoryReportController::class, 'export']);

    Route::get('/dashboard', [DashboardController::class, 'showDashboard']);
    Route::get('/productssearch', [SearchController::class, 'searchProducts']);
});
