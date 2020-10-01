<?php

namespace App\Http\Resources;

use App\Http\Resources\ApiResourceCollection;
use App\User;

class UserCollection extends ApiResourceCollection
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
        $this->collection->transform(function (User $user) {
            return (new UserResource($user));
        });

        return parent::toArray($request);
    }
}
