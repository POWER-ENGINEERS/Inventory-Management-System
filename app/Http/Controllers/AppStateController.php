<?php

namespace App\Http\Controllers;

use App\Models\AppState;
use Illuminate\Http\Request;

class AppStateController extends Controller
{
    private const KEY = 'inventory';

    public function show()
    {
        $state = AppState::where('state_key', self::KEY)->first();

        return response()->json([
            'data' => $state?->data,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'data' => ['required', 'array'],
        ]);

        $state = AppState::updateOrCreate(
            ['state_key' => self::KEY],
            ['data' => $validated['data']]
        );

        return response()->json([
            'message' => 'Application data saved successfully.',
            'data' => $state->data,
        ]);
    }
}
