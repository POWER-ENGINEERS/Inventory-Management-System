# Inventory Management System - Routing Table

## Product Routes

| Method | Path | Handler | Story |
|---|---|---|---|
| GET | /products | listProducts | View all products |
| GET | /products/:id | showProduct | View product details |
| POST | /products | createProduct | Create a product |
| PUT | /products/:id | updateProduct | Update product |
| DELETE | /products/:id | deleteProduct | Delete product |


## Supplier Routes

| Method | Path | Handler | Story |
|---|---|---|---|
|GET | /suppliers   |    listSuppliers | Read Supplier|
|POST | /suppliers  |     createSupplier | Create Supplier |
|PUT | /suppliers/:id |  updateSupplier  | Update suppliers |
|DELETE | /suppliers/:id |  deleteSupplier  | Delete suppliers |


## Stock In Routes

| Method | Path | Handler | Story |
|---|---|---|---|
GET| /stock-ins | listStockIns |View stock-in history|
POST| /stock-ins | createstock-ins | Record incoming stock|

## Stock Out Routes
| Method | Path | Handler | Story |
|---|---|---|---|
GET| /stock-Outs | liststock-Outs | View stock-out history|
POST| /stock-Outs | createstock-Outs | Record outgoing stock|

## Inventory Report

| Method | Path | Handler | Story |
|---|---|---|---|
|GET|/reports/inventory	|showInventoryReport	View inventory report|
|GET|	/reports/inventory|export|

## Dashboard
| Method | Path | Handler | Story |
|---|---|---|---|
|GET	/dashboard	|showDashboard	|View dashboard|

## Search
| Method | Path | Handler | Story |
|---|---|---|---|
|GET	|/productssearch|	searchProducts|	Search products

## Authentication
| Method | Path | Handler | Story |
|---|---|---|---|
|POST|	/auth|login	|login	Login
|POST|	/auth|logout|	logout	Logout
