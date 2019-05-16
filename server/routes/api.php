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
Route::group(['middleware' => 'cors'], function () {
Route::post('/login', 'API\V1\Auth\LoginController@login');
Route::post('/register', 'API\V1\Auth\RegisterController@register');
Route::get('/logout', 'API\V1\Auth\LoginController@logout');

  Route::group(['middleware' => 'auth:api'], function () {
      Route::prefix('v1')->group(function(){
        Route::apiResource("salat", "API\V1\SalatController");
      });
  });

});
