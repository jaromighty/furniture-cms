<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'slug', 'user_id'
    ];

    public $timestamps = false;

    public function orders() {
        return $this->hasMany(Order::class)->orderBy('side_mark');
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
