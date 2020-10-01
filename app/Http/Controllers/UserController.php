<?php

namespace App\Http\Controllers;

use App\Client;
use App\Http\Controllers\APIController;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Get user from $request token.
        if (! $user = auth()->setRequest($request)->user()) {
            return $this->responseUnauthorized();
        }

        $collection = User::all();

        return new UserCollection($collection);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        // Get user from $request token.
        // if (! $user = auth()->setRequest($request)->user()) {
        //     return $this->responseUnauthorized();
        // }

        // Admin can only update data.
        if (auth()->user()->role !== 'admin') {
            return $this->responseUnauthorized();
        }

        // Validates data.
        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->responseUnprocessable($validator->errors());
        }

        try {
            $client = Client::where('id', $request['client'])->firstOrFail();
            if (empty($client->user_id)) {
                $client->user_id = $user->id;
                $client->save();
            }
            $user->update($request->all());
            return response()->json([
                'status' => 201,
                'message' => 'Resource created.',
                'user' => new UserResource($user)
            ]);
        } catch (\Exception $e) {
            return $this->responseServerError('Error updating resource.');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        // Get user from $request token.
        if (! $user = auth()->setRequest($request)->user()) {
            return $this->responseUnauthorized();
        }

        $user = User::where('id', $id)->firstOrFail();

        try {
            $user->delete();
            return $this->responseResourceDeleted();
        } catch (\Exception $e) {
            return $this->responseServerError('Error deleting resource.');
        }
    }
}
