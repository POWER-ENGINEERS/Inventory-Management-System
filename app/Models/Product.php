<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $primaryKey = 'product_id';

    protected $fillable = [
        'product_name',
        'sku',
        'barcode',
        'category_id',
        'brand',
        'supplier_id',
        'quantity',
        'unit',
        'price',
        'purchase_price',
        'selling_price',
        'expiration',
        'description',
        'image',
        'status',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'price' => 'decimal:2',
        'purchase_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
        'expiration' => 'date:Y-m-d',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id', 'supplier_id');
    }

    public function inventoryTransactions()
    {
        return $this->hasMany(
            InventoryTransaction::class,
            'product_id',
            'product_id'
        )->orderByDesc('transaction_date');
    }
}
