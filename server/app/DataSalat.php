<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use App\User;

class DataSalat extends Model
{
   use SoftDeletes;

   protected $fillable = ['id_user', 'subuh', 'zuhur', 'asar', 'magrib', 'isya', 'tanggal'];

   public function users()
   {
      return $this->hasOne(User::class, 'id', 'id_user');
   }
}
