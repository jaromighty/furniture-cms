<?php

namespace App\Http\Resources;

use App\Client;
use App\Http\Resources\ApiResourceCollection;
use App\Http\Resources\ClientResource;

class ClientCollection extends ApiResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // Transforms the collection to match format in ClientResource.
        $this->collection->transform(function (Client $client) {
            return (new ClientResource($client));
        });

        return parent::toArray($request);
    }
}
