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
GET| /stock-ins | /listStockIns | /Read stock-ins|
POST| /stock-ins | /createstock-ins | /create stock-ins|

## Stock Out Routes

GET| /stock-Outs | liststock-Outs | Read stock-Outs|
POST| /stock-Outs | createstock-Outs | create stock-Outs|

