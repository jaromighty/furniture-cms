<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'client_id',
        'side_mark',
        'status',
        'product_order_number',
        'estimated_completion_date',
        'confirmed_at',
        'delivered_at',
        'archived_at',
    ];

    protected $dates = [
        'confirmed_at',
        'delivered_at',
        'archived_at',
    ];

    public function client () {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function products () {
        return $this->belongsToMany(Product::class)->withPivot('id','status','notes');
    }
}
