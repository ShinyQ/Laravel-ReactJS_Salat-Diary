<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DataSalatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
      return [
        'id' => $this->id,
        'tanggal' => date("j F Y", strtotime($this->tanggal)),
        'subuh' => $this->subuh,
        'zuhur' => $this->zuhur,
        'asar' => $this->asar,
        'magrib' => $this->magrib,
        'isya' => $this->isya,
        'user' => [
                     'id_user' => $this->id_user,
                     'nama' =>  $this->users->nama,
                     'email' => $this->users->email,
                 ],
        'created_at'=> (string) $this->created_at,
        'updated_at'=> (string) $this->updated_at,
      ];
    }
}
