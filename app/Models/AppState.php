<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppState extends Model
{
    protected $fillable = [
        'state_key',
        'data',
    ];

    protected function casts(): array
    {
        return [
            'data' => 'array',
        ];
    }
}
