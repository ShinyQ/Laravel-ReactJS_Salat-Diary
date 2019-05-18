<?php

use Illuminate\Database\Seeder;
use App\StatusSalat;

class StatusSalatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(StatusSalat::class,4)->create();
    }
}
