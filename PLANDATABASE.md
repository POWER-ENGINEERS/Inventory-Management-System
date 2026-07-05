# Inventory Management Database

## Products
- product_id (PK)
- product_name
- category_id (FK)
- supplier_id (FK)
- quantity
- price

## Categories
- category_id (PK)
- category_name

## Suppliers
- supplier_id (PK)
- supplier_name
- contact_number

## Inventory_Transactions
- transaction_id (PK)
- product_id (FK)
- transaction_type
- quantity
- transaction_date
