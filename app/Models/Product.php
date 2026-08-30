<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $primaryKey = 'product_id';

    protected $fillable = [
        'product_name',
        'category_id',
        'supplier_id',
        'quantity',
        'price',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'price' => 'decimal:2',
    ];

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