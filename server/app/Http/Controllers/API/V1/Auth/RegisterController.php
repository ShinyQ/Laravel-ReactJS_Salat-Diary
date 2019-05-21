<?php

namespace App\Http\Controllers\API\V1\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use ApiBuilder;
use Validator;
use Illuminate\Support\Facades\Auth;
use App\User;
use Mail;
use App\Mail\VerifikasiEmail;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;

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

      if($request->foto){
        $imageName = time().'.'.request()->foto->getClientOriginalExtension();
        request()->foto->move(public_path('images'), $imageName);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Bcrypt($request->password),
            'jenis_kelamin' => $request->jenis_kelamin,
            'provinsi' => $request->provinsi,
            'kota' => $request->kota,
            'foto' => $imageName,
            'token' => str_random(40)
        ]);
      }
      else{
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Bcrypt($request->password),
            'jenis_kelamin' => $request->jenis_kelamin,
            'provinsi' => $request->provinsi,
            'kota' => $request->kota,
            'token' => str_random(40)
        ]);
      }
      Mail::to($request->email)->send(new VerifikasiEmail($user));

      $success['user'] = $user;

      return ApiBuilder::apiResponseSuccess('Register Sukses!', $success, 200);
    }

    public function verifyUser($token)
    {
      try {
        $verifyUser = User::where('token', $token)->first();
        if($verifyUser->email_verified_at == null) {
            $time = Carbon::now();
            $verifyUser->email_verified_at = $time;
            $verifyUser->save();

            $code= 200;
            $message = "Sukses Mengkonfirmasi Akun";
            $response = $verifyUser;
        }else{
          $code= 200;
          $message = "Anda Sudah Melakukan Verifikasi Akun";
          $response = $verifyUser;
        }

      }catch (\Exception $e) {
        if($e instanceof ModelNotFoundException){
          $code= 200;
          $message = "Data Not Exist";
          $response = [];
        }
        else{
          $code= 500;
          $message = $e->getMessage();
          $response = [];
        }
      }

      return ApiBuilder::apiRespond($code, $response, $message);
    }

    public function updateUser(Request $request)
    {
      $validator = Validator::make($request->all(), [
          'name' => ['required', 'string', 'max:255'],
          'email' => ['string', 'email', 'max:255', 'unique'],
          'password' => ['required', 'string', 'min:8'],
          'jenis_kelamin' => ['required', 'string'],
          'provinsi' => ['required', 'string'],
          'kota' => ['required', 'string'],
      ]);

      if ($validator->fails()) {
          return ApiBuilder::apiResponseValidationFails('Validation error messages!', $validator->errors()->all());
      }

      try {
        $id = \Auth::user()->id;
        $response = User::findOrFail($id)->first();

        if($request->foto){
          $imageName = time().'.'.request()->foto->getClientOriginalExtension();
          request()->foto->move(public_path('images'), $imageName);

          $response->update($request->all());
          $response->foto = $imageName;
          $response->save();
        }
        else{
          $response->update($request->all());
          $response->save();
        }

        $success['user'] = $response;

      } catch (\Exception $e) {
        if($e instanceof ModelNotFoundException){
          $code= 200;
          $message = "Data Not Exist";
          $response = [];
        }
        else{
          $code= 500;
          $message = $e->getMessage();
          $response = [];
        }
      }
      return ApiBuilder::apiResponseSuccess('Update Data Sukses!', $success, 200);
    }

}
