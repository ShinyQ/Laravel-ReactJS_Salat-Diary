<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', 'API\V1\Auth\LoginController@login');
Route::post('/register', 'API\V1\Auth\RegisterController@register');
Route::get('/logout', 'API\V1\Auth\LoginController@logout');
