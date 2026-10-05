<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('Week 9 validation feedback exposes accessible field error hooks', function () {
    $js = file_get_contents(base_path('public/app.js'));

    expect($js)
        ->toContain('input.setAttribute("aria-invalid", "true")')
        ->toContain('error.setAttribute("role", "alert")')
        ->toContain('el.removeAttribute("aria-invalid")');
});

test('Week 9 auth-protected API remains protected', function () {
    $response = $this->getJson('/api/products');

    $response->assertUnauthorized();
});
