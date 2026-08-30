\# Input Validation Matrix



\## Products



\### POST /api/products



| Field | Presence | Type | Length/Range | Format | Allowed Values | Referential |

|---|---|---|---|---|---|---|

| product\_name | required | string | 1–255 characters | plain text | — | — |

| category\_id | required | integer | >= 1 | — | — | must exist in categories |

| supplier\_id | required | integer | >= 1 | — | — | must exist in suppliers |

| quantity | required | integer | >= 0 | — | — | — |

| price | required | numeric | >= 0 | decimal number | — | — |



\### PUT /api/products/{id}



| Field | Presence | Type | Length/Range | Format | Allowed Values | Referential |

|---|---|---|---|---|---|---|

| product\_name | optional (if provided) | string | 1–255 characters | plain text | — | — |

| category\_id | optional (if provided) | integer | >= 1 | — | — | must exist in categories |

| supplier\_id | optional (if provided) | integer | >= 1 | — | — | must exist in suppliers |

| quantity | optional (if provided) | integer | >= 0 | — | — | — |

| price | optional (if provided) | numeric | >= 0 | decimal number | — | — |



\## Suppliers



\### POST /api/suppliers



| Field | Presence | Type | Length/Range | Format | Allowed Values | Referential |

|---|---|---|---|---|---|---|

| supplier\_name | required | string | 1–255 characters | plain text | — | — |

| contact\_number | required | string | 1–255 characters | phone number | — | — |



\### PUT /api/suppliers/{id}



| Field | Presence | Type | Length/Range | Format | Allowed Values | Referential |

|---|---|---|---|---|---|---|

| supplier\_name | optional (if provided) | string | 1–255 characters | plain text | — | — |

| contact\_number | optional (if provided) | string | 1–255 characters | phone number | — | — |



\## Inventory Transactions



\### POST /api/stock-ins



| Field | Presence | Type | Length/Range | Format | Allowed Values | Referential |

|---|---|---|---|---|---|---|

| product\_id | required | integer | >= 1 | — | — | must exist in products |

| quantity | required | integer | >= 1 | — | — | — |



\### POST /api/stock-outs



| Field | Presence | Type | Length/Range | Format | Allowed Values | Referential |

|---|---|---|---|---|---|---|

| product\_id | required | integer | >= 1 | — | — | must exist in products |

| quantity | required | integer | >= 1 | — | — | — |



> Stock-out quantity must also not exceed the product's available stock.

