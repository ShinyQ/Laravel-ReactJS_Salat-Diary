<?php

use Illuminate\Database\Seeder;
use App\JadwalSalat;

class JadwalSalatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(JadwalSalat::class,5)->create();
    }
}
