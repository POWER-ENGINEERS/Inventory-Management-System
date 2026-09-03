# Inventory Management System - Routing Table

## Product Routes

| Method | Path | Handler | Example Request | Example Response |
|---|---|---|---|---|
| GET | /api/products | ProductController@listProducts | GET /api/products | `{"status":"success","data":[...]}` |
| GET | /api/products/{id} | ProductController@showProduct | GET /api/products/25 | `{"status":"success","data":{...}}` |
| POST | /api/products | ProductController@createProduct | POST /api/products | `{"status":"success","data":{...}}` |
| PUT | /api/products/{id} | ProductController@updateProduct | PUT /api/products/25 | `{"status":"success","data":{...}}` |
| DELETE | /api/products/{id} | ProductController@deleteProduct | DELETE /api/products/25 | `{"status":"success","data":{...}}` |

## Supplier Routes

| Method | Path | Handler | Example Request | Example Response |
|---|---|---|---|---|
| GET | /api/suppliers | SupplierController@listSuppliers | GET /api/suppliers | `{"status":"success","data":[...]}` |
| POST | /api/suppliers | SupplierController@createSupplier | POST /api/suppliers | `{"status":"success","data":{...}}` |
| PUT | /api/suppliers/{id} | SupplierController@updateSupplier | PUT /api/suppliers/10 | `{"status":"success","data":{...}}` |
| DELETE | /api/suppliers/{id} | SupplierController@deleteSupplier | DELETE /api/suppliers/10 | `{"status":"success","data":{...}}` |

## Stock In Routes

| Method | Path | Handler | Example Request | Example Response |
|---|---|---|---|---|
| GET | /api/stock-ins | StockInController@listStockIns | GET /api/stock-ins | `{"status":"success","data":[...]}` |
| POST | /api/stock-ins | StockInController@createStockIn | POST /api/stock-ins | `{"status":"success","data":{...}}` |

## Stock Out Routes

| Method | Path | Handler | Example Request | Example Response |
|---|---|---|---|---|
| GET | /api/stock-outs | StockOutController@listStockOuts | GET /api/stock-outs | `{"status":"success","data":[...]}` |
| POST | /api/stock-outs | StockOutController@createStockOut | POST /api/stock-outs | `{"status":"success","data":{...}}` |

> Stock-out requests are rejected when the requested quantity exceeds the product's available stock.

## Inventory Report

| Method | Path | Handler | Example Request | Example Response |
|---|---|---|---|---|
| GET | /api/reports/inventory | InventoryReportController@showInventoryReport | GET /api/reports/inventory | `{"total_products":...,"total_quantity":...,"total_inventory_value":...,"products":[...]}` |
| GET | /api/reports/inventory/export | InventoryReportController@export | GET /api/reports/inventory/export | CSV inventory report |

## Dashboard

| Method | Path | Handler | Example Request | Example Response |
|---|---|---|---|---|
| GET | /api/dashboard | DashboardController@showDashboard | GET /api/dashboard | `{"total_products":...,"low_stock_products":[...],"recent_activities":[...]}` |

## Search

| Method | Path | Handler | Example Request | Example Response |
|---|---|---|---|---|
| GET | /api/productssearch | SearchController@searchProducts | GET /api/productssearch?search=keyboard | `[...]` |

## Authentication

| Method | Path | Handler | Example Request | Example Response |
|---|---|---|---|---|
| POST | /api/auth/login | AuthController@login | POST /api/auth/login | `{"message":"Login successful","user":{...},"token":"..."}` |
| POST | /api/auth/logout | AuthController@logout | POST /api/auth/logout | `{"message":"Logout successful"}` |

> The logout route requires authentication using the `auth:sanctum` middleware.