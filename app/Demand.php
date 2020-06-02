<?php

namespace App;

use App\Category;
use Illuminate\Database\Eloquent\Model;

class Demand extends Model
{
    protected $fillable = ['first_name', 'last_name', 'email', 'city', 'phone', 'category_id'];




    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
