<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group.
|
*/

// Auth Endpoints
Route::group([
    'middleware' => 'cors',
    'prefix' => 'v1/auth'
], function ($router) {
    Route::post('login', 'Auth\LoginController@login');
    Route::post('logout', 'Auth\LogoutController@logout');
    Route::post('register', 'Auth\RegisterController@register');
    Route::post('forgot-password', 'Auth\ForgotPasswordController@email');
    Route::post('password-reset', 'Auth\ResetPasswordController@reset');
});

// Resource Endpoints
Route::group([
    'middleware' => 'cors',
    'prefix' => 'v1'
], function ($router) {
    Route::apiResource('clients', 'ClientController');
    Route::apiResource('orders', 'OrderController');
    Route::apiResource('products', 'ProductController');
    Route::apiResource('users', 'UserController');
    Route::post('orders/add-product', 'OrderController@addProduct');
    Route::put('orders/update-product/{order}/{pivotId}', 'OrderController@updateProduct');
    Route::delete('orders/delete-product/{order}/{pivotId}', 'OrderController@deleteProduct');
});

// Not Found
Route::fallback(function(){
    return response()->json(['message' => 'Resource not found.'], 404);
});
