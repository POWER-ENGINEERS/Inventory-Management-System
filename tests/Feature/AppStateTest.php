<?php

use AppModelsAppState;
use IlluminateFoundationTestingRefreshDatabase;

uses(RefreshDatabase::class);

test('application state can be saved and retrieved', function () {
    $payload = [
        'data' => [
            'last_view' => 'products',
            'filters' => [
                'search' => 'laptop',
                'status' => 'Active',
            ],
        ],
    ];

    $save = $this->withToken(authToken())
        ->putJson('/api/app-state', $payload);

    $save->assertOk()
        ->assertJson([
            'message' => 'Application data saved successfully.',
            'data' => $payload['data'],
        ]);

    $this->assertDatabaseHas('app_states', [
        'state_key' => 'inventory',
    ]);

    $this->withToken(authToken())
        ->getJson('/api/app-state')
        ->assertOk()
        ->assertJson([
            'data' => $payload['data'],
        ]);
});

test('application state rejects a missing data payload', function () {
    $response = $this->withToken(authToken())
        ->putJson('/api/app-state', []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['data']);

    expect(AppState::query()->where('state_key', 'inventory')->exists())->toBeFalse();
});

test('application state rejects a non-array data payload', function () {
    $response = $this->withToken(authToken())
        ->putJson('/api/app-state', [
            'data' => 'invalid-state',
        ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['data']);

    expect(AppState::query()->where('state_key', 'inventory')->exists())->toBeFalse();
});
