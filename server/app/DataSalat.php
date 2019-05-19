<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use App\User;
use App\StatusSalat;
use App\JadwalSalat;

class DataSalat extends Model
{
   use SoftDeletes;

   protected $fillable = ['id_user', 'id_jadwal', 'id_status', 'tanggal'];

   public function user()
   {
      return $this->hasOne(User::class, 'id', 'id_user');
   }

   public function status()
   {
      return $this->hasOne(StatusSalat::class, 'id', 'id_status');
   }

   public function jadwal()
   {
      return $this->hasOne(JadwalSalat::class, 'id', 'id_jadwal');
   }
}
