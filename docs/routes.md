\# Inventory Management System - Routing Table



\## Product Routes



| Method | Path | Handler | Example Request | Example Response |

|---|---|---|---|---|

| GET | /api/products | listProducts | GET /api/products | {"message":"listProducts stub"} |

| GET | /api/products/{id} | showProduct | GET /api/products/25 | {"message":"showProduct stub","id":"25"} |

| POST | /api/products | createProduct | POST /api/products | {"message":"createProduct stub"} |

| PUT | /api/products/{id} | updateProduct | PUT /api/products/25 | {"message":"updateProduct stub","id":"25"} |

| DELETE | /api/products/{id} | deleteProduct | DELETE /api/products/25 | {"message":"deleteProduct stub","id":"25"} |



\## Supplier Routes



| Method | Path | Handler | Example Request | Example Response |

|---|---|---|---|---|

| GET | /api/suppliers | listSuppliers | GET /api/suppliers | {"message":"listSuppliers stub"} |

| POST | /api/suppliers | createSupplier | POST /api/suppliers | {"message":"createSupplier stub"} |

| PUT | /api/suppliers/{id} | updateSupplier | PUT /api/suppliers/10 | {"message":"updateSupplier stub","id":"10"} |

| DELETE | /api/suppliers/{id} | deleteSupplier | DELETE /api/suppliers/10 | {"message":"deleteSupplier stub","id":"10"} |



\## Stock In Routes



| Method | Path | Handler | Example Request | Example Response |

|---|---|---|---|---|

| GET | /api/stock-ins | listStockIns | GET /api/stock-ins | {"message":"listStockIns stub"} |

| POST | /api/stock-ins | createStockIn | POST /api/stock-ins | {"message":"createStockIn stub"} |



\## Stock Out Routes



| Method | Path | Handler | Example Request | Example Response |

|---|---|---|---|---|

| GET | /api/stock-outs | listStockOuts | GET /api/stock-outs | {"message":"listStockOuts stub"} |

| POST | /api/stock-outs | createStockOut | POST /api/stock-outs | {"message":"createStockOut stub"} |



\## Inventory Report



| Method | Path | Handler | Example Request | Example Response |

|---|---|---|---|---|

| GET | /api/reports/inventory | showInventoryReport | GET /api/reports/inventory | {"message":"showInventoryReport stub"} |

| GET | /api/reports/inventory/export | export | GET /api/reports/inventory/export | {"message":"export stub"} |



\## Dashboard



| Method | Path | Handler | Example Request | Example Response |

|---|---|---|---|---|

| GET | /api/dashboard | showDashboard | GET /api/dashboard | {"message":"showDashboard stub"} |



\## Search



| Method | Path | Handler | Example Request | Example Response |

|---|---|---|---|---|

| GET | /api/productssearch | searchProducts | GET /api/productssearch | {"message":"searchProducts stub"} |



\## Authentication



| Method | Path | Handler | Example Request | Example Response |

|---|---|---|---|---|

| POST | /api/auth/login | login | POST /api/auth/login | {"message":"login stub"} |

| POST | /api/auth/logout | logout | POST /api/auth/logout | {"message":"logout stub"} |

