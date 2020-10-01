<?php

namespace App\Http\Resources;

use App\Http\Resources\ApiResource;

class ProductResource extends ApiResource
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
            'pivot' => $this->pivot,
        ];
    }
}
