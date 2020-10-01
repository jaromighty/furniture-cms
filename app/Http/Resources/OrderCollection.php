<?php

namespace App\Http\Resources;

use App\Http\Resources\ApiResourceCollection;
use App\Order;

class OrderCollection extends ApiResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // Transforms the collection to match format in OrderResource.
        $this->collection->transform(function (Order $order) {
            return (new OrderResource($order));
        });

        return parent::toArray($request);
    }
}
