# Input Validation Matrix

## Products

### POST /api/products

| Field | Presence | Type | Length/Range | Format | Allowed Values | Referential |
|---|---|---|---|---|---|---|
| product_name | required | string | 1-255 characters | plain text | - | - |
| category_id | required | integer | >= 1 | - | - | must exist in categories |
| supplier_id | required | integer | >= 1 | - | - | must exist in suppliers |
| quantity | required | integer | >= 0 | - | - | - |
| price | required | numeric | >= 0 | decimal number | - | - |

### PUT /api/products/{id}

| Field | Presence | Type | Length/Range | Format | Allowed Values | Referential |
|---|---|---|---|---|---|---|
| product_name | optional (if provided) | string | 1-255 characters | plain text | - | - |
| category_id | optional (if provided) | integer | >= 1 | - | - | must exist in categories |
| supplier_id | optional (if provided) | integer | >= 1 | - | - | must exist in suppliers |
| quantity | optional (if provided) | integer | >= 0 | - | - | - |
| price | optional (if provided) | numeric | >= 0 | decimal number | - | - |

## Suppliers

### POST /api/suppliers

| Field | Presence | Type | Length/Range | Format | Allowed Values | Referential |
|---|---|---|---|---|---|---|
| supplier_name | required | string | max 255 characters | plain text | - | - |
| contact_number | nullable | string | max 255 characters | phone number | - | - |

### PUT /api/suppliers/{id}

| Field | Presence | Type | Length/Range | Format | Allowed Values | Referential |
|---|---|---|---|---|---|---|
| supplier_name | optional (if provided) | string | max 255 characters | plain text | - | - |
| contact_number | optional/nullable | string | max 255 characters | phone number | - | - |

## Inventory Transactions

### POST /api/stock-ins

| Field | Presence | Type | Length/Range | Format | Allowed Values | Referential |
|---|---|---|---|---|---|---|
| product_id | required | integer | >= 1 | - | - | must exist in products |
| quantity | required | integer | >= 1 | - | - | - |

### POST /api/stock-outs

| Field | Presence | Type | Length/Range | Format | Allowed Values | Referential |
|---|---|---|---|---|---|---|
| product_id | required | integer | >= 1 | - | - | must exist in products |
| quantity | required | integer | >= 1 | - | - | - |

> Stock-out quantity must also not exceed the product's available stock.