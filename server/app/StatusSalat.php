<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StatusSalat extends Model
{
  use SoftDeletes;
  protected $fillable = ['nama'];
}
