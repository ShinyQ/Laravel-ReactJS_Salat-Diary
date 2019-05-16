<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;
use ApiBuilder;
use App\DataSalat;
use App\Http\Resources\DataSalatResource;
use App\Http\Resources\DataSalatCollection;


class SalatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      try {
        $code = 200;
        $message = "success";
        $response = DataSalat::query()->where('id_user', \Auth::user()->id);

        $counter = 1;
        $pagination = 5;

        $response = $response->paginate($pagination);
        if( request()->has('page') && request()->get('page') > 1){
            $counter += (request()->get('page')- 1) * $pagination;
          }
        $response = new DataSalatCollection($response);

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
      return ApiBuilder::apiRespond($code, $response, $message);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      try{
          $this->validate($request, [
                'id_user'  => 'required',
                'tanggal'   => 'required|date'
          ]);
          $response = new DataSalat($request->except("_token"));
          $response->save();
          $code = 200;
          $message = "success";

      }catch (\Exception $e) {
        if ($e instanceof ValidationException) {
              $code = 422;
              $message = $e->errors();
              $response = [];
          } else{
              $code = 500;
              $message = $e->getMessage();
              $response = [];
          }
      }
      return ApiBuilder::apiRespond($code, $response, $message);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      try {
        $code = 200;
        $message = "success";
        $response = DataSalat::findOrFail($id);
        $response = new DataSalatResource($response);

      } catch (\Exception $e) {
        if($e instanceof ModelNotFoundException){
          $code= 200;
          $message = "Data Not Exist";
          $response = [];
        }
        else{
          $code= 500;
          $message = $e->errors();
          $response = [];
        }
      }
      return ApiBuilder::apiRespond($code, $response, $message);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      try{
          $this->validate($request, [
                'id_user'  => 'required',
                'tanggal'   => 'required|date'
          ]);
          $response = DataSalat::findOrFail($id);
          $response->id_user = $request->id_user;
          $response->tanggal = $request->tanggal;
          $response->subuh = $request->subuh;
          $response->zuhur = $request->zuhur;
          $response->asar = $request->asar;
          $response->magrib = $request->magrib;
          $response->isya = $request->isya;

          $response->save();
          $code = 200;
          $message = "success";

      }catch (\Exception $e) {
        if ($e instanceof ValidationException) {
              $code = 422;
              $message = $e->errors();
              $response = [];
          } else{
              $code = 500;
              $message = $e->getMessage();
              $response = [];
          }
      }
      return ApiBuilder::apiRespond($code, $response, $message);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      try {
        $code = 200;
        $message = "success";
        $response = DataSalat::findOrFail($id);
        $response = $response->delete();
        
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
      return ApiBuilder::apiRespond($code, $response, $message);
    }
}
