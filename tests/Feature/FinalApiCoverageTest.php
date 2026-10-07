<?php

test('all protected inventory API entry points reject unauthenticated requests', function () {
    $routes = [
        ['GET', '/api/categories'],
        ['GET', '/api/products'],
        ['GET', '/api/suppliers'],
        ['GET', '/api/stock-ins'],
        ['GET', '/api/stock-outs'],
        ['GET', '/api/reports/inventory'],
        ['GET', '/api/dashboard'],
        ['GET', '/api/app-state'],
        ['GET', '/api/auth/users'],
        ['GET', '/api/productssearch?search=laptop'],
    ];

    foreach ($routes as [$method, $uri]) {
        $response = $this->call($method, $uri);
        $response->assertUnauthorized();
    }
});

test('login validation rejects a request with missing required fields', function () {
    $response = $this->postJson('/api/auth/login', []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors([
            'identifier',
            'password',
            'role',
        ]);
});
