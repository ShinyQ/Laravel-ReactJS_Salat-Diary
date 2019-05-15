<?php

namespace App\Http\Controllers\API\V1\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use ApiBuilder;
use Validator;
use Illuminate\Support\Facades\Auth;
use App\User;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
      $validator = Validator::make($request->all(), [
          'name' => ['required', 'string', 'max:255'],
          'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
          'password' => ['required', 'string', 'min:8'],
          'jenis_kelamin' => ['required', 'string'],
          'provinsi' => ['required', 'string'],
          'kota' => ['required', 'string'],
      ]);

      if ($validator->fails()) {
          return ApiBuilder::apiResponseValidationFails('Validation error messages!', $validator->errors()->all());
      }

      $user = User::create([
          'name' => $request->name,
          'email' => $request->email,
          'password' => Bcrypt($request->password),
          'jenis_kelamin' => $request->jenis_kelamin,
          'provinsi' => $request->provinsi,
          'kota' => $request->kota
      ]);

      $success['user'] = $user;

      return ApiBuilder::apiResponseSuccess('Register Sukses!', $success, 200);
    }
}
