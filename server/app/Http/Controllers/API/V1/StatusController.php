<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;
use ApiBuilder;
use App\StatusSalat;


class statusController extends Controller
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
        $response = StatusSalat::query();

        $counter = 1;
        $pagination = 5;

        $response = $response->paginate($pagination);
        if( request()->has('page') && request()->get('page') > 1){
            $counter += (request()->get('page')- 1) * $pagination;
          }

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
                'nama'  => 'required',
          ]);
          $response = new StatusSalat($request->except("_token"));
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
                'nama'  => 'required',
          ]);
          $response = StatusSalat::findOrFail($id);
          $response->update($request->all());

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
      // try {
      //   $code = 200;
      //   $message = "success";
      //   $response = StatusSalat::findOrFail($id);
      //   $response = $response->delete();
      //
      // } catch (\Exception $e) {
      //   if($e instanceof ModelNotFoundException){
      //     $code= 200;
      //     $message = "Data Not Exist";
      //     $response = [];
      //   }
      //   else{
      //     $code= 500;
      //     $message = $e->getMessage();
      //     $response = [];
      //   }
      // }
      // return ApiBuilder::apiRespond($code, $response, $message);
    }
}
