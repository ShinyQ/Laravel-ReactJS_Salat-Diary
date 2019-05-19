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
Route::get('/verifikasi/{id}', 'API\V1\Auth\RegisterController@verifyUser');

  Route::group(['middleware' => 'auth:api'], function () {
      Route::prefix('v1')->group(function(){
        Route::get('user', 'API\V1\Auth\LoginController@getUser');

        Route::apiResource("salat", "API\V1\SalatController");
        Route::apiResource("status", "API\V1\StatusController");
        Route::apiResource("jadwal", "API\V1\StatusController");
      });
  });
});
