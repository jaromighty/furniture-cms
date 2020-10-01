<?php

namespace App\Http\Resources;

use App\Http\Resources\ApiResourceCollection;
use App\Product;

class ProductCollection extends ApiResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // Transforms the collection to match format in ProductResource.
        $this->collection->transform(function (Product $product) {
            return (new ProductResource($product));
        });

        return parent::toArray($request);
    }
}
