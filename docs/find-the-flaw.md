# Week 09 — Find the Flaw

The examples below are intentionally flawed AI-style snippets for review practice.

## Flaw 1 — Missing validation

### Snippet
```php
public function searchProducts(Request $request)
{
    $search = $request->query('search');

    return response()->json([
        'status' => 'success',
        'data' => Product::where('product_name', 'like', "%{$search}%")->get(),
    ]);
}
```

### What's wrong
- The input is not validated.
- The endpoint does not define a reasonable maximum search length.
- The code only searches product names and silently drops the existing SKU/barcode/brand search behavior.

### Fix
Validate the query parameter and preserve the intended search fields. The actual Week 9 implementation validates `search` and `q` as nullable strings with a maximum length of 100.

**Review label:** blocking

---

## Flaw 2 — Wrong status code

### Snippet
```php
if (!$product) {
    return response()->json([
        'status' => 'error',
        'error' => 'Product not found',
    ], 200);
}
```

### What's wrong
A missing product is being reported with HTTP 200, which communicates a successful request. This makes client-side error handling unreliable.

### Fix
Return HTTP 404 for a missing product.

**Review label:** blocking

---

## Flaw 3 — Missing edge case

### Snippet
```php
$query->where('quantity', '>=', $request->quantity);
```

### What's wrong
The value is used without validating that it is a numeric, non-negative quantity.

### Fix
Validate the input before using it, for example with an integer/minimum rule appropriate to the endpoint.

**Review label:** blocking

---

## Flaw 4 — Hallucinated method

### Snippet
```php
$product = Product::findOrReturn404($id);
```

### What's wrong
The method may not exist on the project's Product model. AI-generated code must be checked against the actual framework/model API instead of assuming a method exists.

### Fix
Use a method supported by the project, such as `Product::find($id)`, followed by an explicit 404 response when the record is missing, or a verified Laravel method available in the project's version.

**Review label:** blocking
