<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use Illuminate\Support\Str;
use Faker\Generator as Faker;
use App\DataSalat;
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
        'subuh' => $faker->randomElement(['Salat Berjamaah', 'Salat Sendiri', 'Terlambat Salat', 'Tidak Salat']),
        'zuhur' => $faker->randomElement(['Salat Berjamaah', 'Salat Sendiri', 'Terlambat Salat', 'Tidak Salat']),
        'asar' => $faker->randomElement(['Salat Berjamaah', 'Salat Sendiri', 'Terlambat Salat', 'Tidak Salat']),
        'magrib' => $faker->randomElement(['Salat Berjamaah', 'Salat Sendiri', 'Terlambat Salat', 'Tidak Salat']),
        'isya' => $faker->randomElement(['Salat Berjamaah', 'Salat Sendiri', 'Terlambat Salat', 'Tidak Salat']),
        'tanggal' => $faker->unique()->date($format = 'Y-m-d', $max = 'now'),
    ];
});
