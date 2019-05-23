<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use App\Http\Resources\DataSalatResource;
use App\Http\Resources\DataSalatCollection;
use Exception;
use ApiBuilder;
use App\DataSalat;
use Carbon\Carbon;


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
        $tanggal = Carbon::now()->format('Y-m-d');

        $code = 200;
        $message = "success";
        $response = DataSalat::query()->where('id_user', \Auth::user()->id);

        if (request()->has("tanggal") && strlen(request()->query("tanggal")) >= 1) {
          $response->where('tanggal', request()->query("tanggal"));
        }

        if (request()->has("start_at") && strlen(request()->query("start_at")) >= 1) {
          $response->whereBetween('tanggal', [request()->query("start_at"), request()->query("end_at")]);
        }

        if (request()->has("status") && strlen(request()->query("status")) >= 1) {
          $data = $response->where('id_status', request()->query("status"))->get();
        }

        if (request()->has("jadwal") &&
            strlen(request()->query("jadwal")) >= 1 &&
            request()->has("status") &&
            strlen(request()->query("status")) >= 1 &&
            request()->has("bulan") &&
            strlen(request()->query("status")) >= 1
           ){
           $data = $response->where('id_jadwal', request()->query("jadwal"))
                            ->where('id_status', request()->query("status"))
                            ->whereMonth('tanggal', request()->query("bulan"))
                            ->get();
        }

        if (request()->has("today")) {
          $response->where('tanggal', $tanggal);
        }

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
                'id_jadwal'  => 'required',
                'id_status'  => 'required',
                'tanggal'   => 'required|date'
          ]);

          $CheckData = DataSalat::where('id_user', \Auth::user()->id)->where('tanggal', $request->tanggal)->where('id_jadwal', $request->id_jadwal)->first();

          if($CheckData == NULL){
            $response = new DataSalat($request->except("_token"));
            $response->id_user = \Auth::user()->id;
            $response->save();
            $code = 200;
            $message = "success";
          }
          else{
            $code = 200;
            $message = "Data Dengan Jadwal Tersebut Sudah Ada";
            $response = [];
          }

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
                'id_jadwal'  => 'required',
                'id_status'  => 'required',
                'tanggal'   => 'required|date'
          ]);
          $response = DataSalat::findOrFail($id);
          $response->update($request->all());
          $response->id_user = \Auth::user()->id;
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
