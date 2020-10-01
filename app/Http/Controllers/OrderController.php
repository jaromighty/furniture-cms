<?php

namespace App\Http\Controllers;

use App\Http\Controllers\APIController;
use App\Http\Resources\OrderCollection;
use App\Http\Resources\OrderResource;
use App\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends APIController
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

        $collection = Order::all();

        return new OrderCollection($collection);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Get user from $request token.
        if (! $user = auth()->setRequest($request)->user()) {
            return $this->responseUnauthorized();
        }

        // Admin can only store data.
        if ($user->role !== 'admin') {
            return $this->responseUnauthorized();
        }

        // Validate all the required parameters have been sent.
        $validator = Validator::make($request->all(), [
            'client_id' => 'required',
            'side_mark' => 'required',
            'status' => 'in:pending,working',
            'product_order_number' => 'string'
        ]);

        if ($validator->fails()) {
            return $this->responseUnprocessable($validator->errors());
        }

        // $confirmedDate = null;
        if (request('status') === "working") {
            $confirmedDate = Carbon::now()->format('Y-m-d H:i:s');
        } else {
            $confirmedDate = null;
        }

        // Warning: Data isn't being fully sanitized yet.
        try {
            $order = Order::create([
                'client_id' => request('client_id'),
                'product_order_number' => request('product_order_number'),
                'side_mark' => request('side_mark'),
                'status' => request('status'),
                'confirmed_at' => $confirmedDate,
                'estimated_completion_date' => Carbon::parse(request('estimated_completion_date'))->format('Y-m-d'),
            ]);
            return response()->json([
                'status' => 201,
                'message' => 'Resource created.',
                'order' => new OrderResource($order)
            ], 201);
        } catch (\Exception $e) {
            return $this->responseServerError('Error creating resource.');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        // Get user from $request token.
        if (! $user = auth()->setRequest($request)->user()) {
            return $this->responseUnauthorized();
        }

        // Admin can only update data.
        if ($user->role !== 'admin') {
            return $this->responseUnauthorized();
        }

        // Validates data.
        $validator = Validator::make($request->all(), [
            'client_id' => 'string',
            'side_mark' => 'string',
            'status' => 'in:pending,working,delivered,archived',
            'product_order_number' => 'string',
        ]);

        if ($validator->fails()) {
            return $this->responseUnprocessable($validator->errors());
        }

        try {
            $order->update($request->all());
            return $this->responseResourceUpdated();
        } catch (\Exception $e) {
            return $this->responseServerError('Error updating resource.');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Order $order)
    {
        // Get user from $request token.
        if (! $user = auth()->setRequest($request)->user()) {
            return $this->responseUnauthorized();
        }

        // Admin can only delete data.
        if ($user->role !== 'admin') {
            return $this->responseUnauthorized();
        }

        try {
            $order->delete();
            return $this->responseResourceDeleted();
        } catch (\Exception $e) {
            return $this->responseServerError('Error deleting resource.');
        }
    }

    /**
     * Attach product to the order
     */
    public function addProduct(Request $request)
    {
        // Get user from $request token.
        if (! $user = auth()->setRequest($request)->user()) {
            return $this->responseUnauthorized();
        }

        // Admin can only store data.
        if ($user->role !== 'admin') {
            return $this->responseUnauthorized();
        }

        $order = Order::where('id', $request->order_id)->firstOrFail();
        $order->products()->attach($request->product_id, [
            'status' => $request->status,
            'notes' => $request->notes
        ]);
        
        $updatedOrder = Order::where('id', $request->order_id)->with('products')->firstOrFail();
        return (new OrderResource($order));
    }

    /**
     * Update product in the order
     */
    public function updateProduct(Request $request, Order $order, $pivotId)
    {
        // Get user from $request token.
        if (! $user = auth()->setRequest($request)->user()) {
            return $this->responseUnauthorized();
        }

        // Admin can only update data.
        if ($user->role !== 'admin') {
            return $this->responseUnauthorized();
        }

        try {
            DB::table('order_product')->where('id', $pivotId)->update(['status' => $request->status]);
            return $this->responseResourceUpdated();
        } catch (\Exception $e) {
            return $this->responseServerError('Error updating resource.');
        }
    }

    /**
     * Delete product from the order
     */
    public function deleteProduct(Request $request, Order $order, $pivotId)
    {
        // Get user from $request token.
        if (! $user = auth()->setRequest($request)->user()) {
            return $this->responseUnauthorized();
        }

        // Admin can only delete data.
        if ($user->role !== 'admin') {
            return $this->responseUnauthorized();
        }

        try {
            $order->products()->wherePivot('id', $pivotId)->detach();
            return $this->responseResourceDeleted();
        } catch (\Exception $e) {
            return $this->responseServerError('Error deleting product.');
        }
    }
}
