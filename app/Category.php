<?php

namespace App;

use App\Demand;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'usage_name'];



    public function demands()
    {
        return $this->hasMany(Demand::class);
    }
}
