<?php

namespace App\Http\Controllers\API\V1\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use ApiBuilder;
use Validator;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{

  public function login(Request $request)
  {
    $validator = Validator::make($request->all(), [
        'email' => ['required', 'email'],
        'password' => ['required']
    ]);

    if ($validator->fails()) {
        return ApiBuilder::apiResponseValidationFails('Login validation fails!', $validator->errors()->all(), 422);
    }

    if (Auth::attempt([
        'email' => $request->email,
        'password' => $request->password
    ])) {
        $user = Auth::user();
        $success['user'] = $user;
        $success['token'] = $user->createToken('myApp')->accessToken;
        return ApiBuilder::apiResponseSuccess('Anda berhasil login!', $success, 200);
    } else {
        return ApiBuilder::apiResponseErrors('Gagal login!', [
            'User belum terdaftar atau password anda salah'
        ], 401);
    }
  }

  public function logout()
  {
    Auth::logout();
    return ApiBuilder::apiResponseSuccess('Anda berhasil logout', [], 200);
  }

}
