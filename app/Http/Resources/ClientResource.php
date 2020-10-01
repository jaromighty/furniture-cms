<?php

namespace App\Http\Resources;

use App\Http\Resources\ApiResource;
use App\Custom\Hasher;

class ClientResource extends ApiResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'orders' => OrderResource::collection($this->orders),
        ];
    }
}
