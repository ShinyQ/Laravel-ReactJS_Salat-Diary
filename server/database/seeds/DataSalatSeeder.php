<?php

use Illuminate\Database\Seeder;
use App\DataSalat;

class DataSalatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(DataSalat::class,5)->create();
    }
}
