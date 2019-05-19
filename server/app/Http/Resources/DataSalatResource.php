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
        'salat' => [
                      'nama' => $this->jadwal->nama,
                      'status' => $this->status->nama
                    ],

        'user' => [
                     'id_user' => $this->id_user,
                     'nama' =>  $this->user->nama,
                     'email' => $this->user->email,
                 ],
        'created_at'=> (string) $this->created_at,
        'updated_at'=> (string) $this->updated_at,
      ];
    }
}
