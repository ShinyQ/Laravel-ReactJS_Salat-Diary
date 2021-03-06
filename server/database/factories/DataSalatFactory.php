<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use Illuminate\Support\Str;
use Faker\Generator as Faker;
use App\DataSalat;
use App\StatusSalat;
use App\JadwalSalat;
use App\User;
/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(DataSalat::class, function (Faker $faker) {
    return [
        'id_user'=>function(){
          return User::all()->random();
        },
        'id_status'=>function(){
          return StatusSalat::all()->random();
        },
        'id_jadwal'=>function(){
          return JadwalSalat::all()->random();
        },
        'tanggal' => $faker->date($format = 'Y-m-d', $min ='now', $max= '2019-6-31'),
    ];
});
