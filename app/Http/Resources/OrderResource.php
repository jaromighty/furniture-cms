<?php

namespace App\Http\Resources;

use App\Http\Resources\ApiResource;

class OrderResource extends ApiResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'client' => $this->client_id,
            'side_mark' => $this->side_mark,
            'status' => $this->status,
            'product_order_number' => $this->product_order_number,
            'estimated_completion_date' => (string)$this->estimated_completion_date,
            'confirmed_at' => (string)$this->confirmed_at,
            'delivered_at' => (string)$this->delivered_at,
            'archived_at' => (string)$this->archived_at,
            'created_at' => (string)$this->created_at->toDateTimeString(),
            'updated_at' => (string)$this->updated_at->toDateTimeString(),
            'products' => ProductResource::collection($this->products),
        ];
    }
}
