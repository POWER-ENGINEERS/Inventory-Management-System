<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\InventoryReportController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\AuthController;

Route::get('/products', [ProductController::class, 'listProducts']);
Route::get('/products/{id}', [ProductController::class, 'showProduct']);
Route::post('/products', [ProductController::class, 'createProduct']);
Route::put('/products/{id}', [ProductController::class, 'updateProduct']);
Route::delete('/products/{id}', [ProductController::class, 'deleteProduct']);

use App\Http\Controllers\SupplierController;

Route::get('/suppliers', [SupplierController::class, 'listSuppliers']);
Route::get('/suppliers/{id}', [SupplierController::class, 'showSupplier']);
Route::post('/suppliers', [SupplierController::class, 'createSupplier']);
Route::put('/suppliers/{id}', [SupplierController::class, 'updateSupplier']);
Route::delete('/suppliers/{id}', [SupplierController::class, 'deleteSupplier']);

use App\Http\Controllers\StockInController;

Route::get('/stock-ins', [StockInController::class, 'listStockIns']);
Route::get('/stock-ins/{id}', [StockInController::class, 'showStockIn']);
Route::post('/stock-ins', [StockInController::class, 'createStockIn']);
Route::put('/stock-ins/{id}', [StockInController::class, 'updateStockIn']);
Route::delete('/stock-ins/{id}', [StockInController::class, 'deleteStockIn']);
use App\Http\Controllers\StockOutController;

Route::get('/stock-outs', [StockOutController::class, 'listStockOuts']);
Route::get('/stock-outs/{id}', [StockOutController::class, 'showStockOut']);
Route::post('/stock-outs', [StockOutController::class, 'createStockOut']);
Route::put('/stock-outs/{id}', [StockOutController::class, 'updateStockOut']);
Route::delete('/stock-outs/{id}', [StockOutController::class, 'deleteStockOut']);

Route::get('/reports/inventory', [InventoryReportController::class, 'showInventoryReport']);
Route::get('/reports/inventory/export', [InventoryReportController::class, 'export']);

Route::get('/dashboard', [DashboardController::class, 'showDashboard']);
Route::get('/productssearch', [SearchController::class, 'searchProducts']);

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum');
