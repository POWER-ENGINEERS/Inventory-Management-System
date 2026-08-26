<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryTransaction extends Model
{
    protected $primaryKey = 'transaction_id';

    protected $fillable = [
        'product_id',
        'transaction_type',
        'quantity',
        'transaction_date',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'transaction_date' => 'datetime',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }
}