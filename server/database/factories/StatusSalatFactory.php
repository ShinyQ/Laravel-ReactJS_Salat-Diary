<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use Illuminate\Support\Str;
use Faker\Generator as Faker;
use App\StatusSalat;

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

$factory->define(StatusSalat::class, function (Faker $faker) {
    return [
          'nama' => $faker->unique()->randomElement(['Salat Berjamaah', 'Salat Sendiri', 'Terlambat Salat', 'Tidak Salat'])
    ];
});
