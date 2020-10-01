import React from 'react';

const orderNew = ({ order, handleNewOrderChange, handleNewOrderSubmit, closeNewOrderForm }) => (
    <div className="mb-6 mr-10 rounded-lg bg-white shadow-xl border-l-8 border-blue-400">
        <form className="flex justify-between p-4">
            <div className="w-64">
                <input type="text" className="block font-semibold text-lg focus:outline-none placeholder-gray-500" placeholder="Side Mark" value={order.side_mark} onChange={() => handleNewOrderChange('side_mark', event)} autoFocus/>
                <input type="text" className="block font-semibold text-sm text-gray-600 uppercase tracking-wide focus:outline-none placeholder-gray-400" placeholder="Product Order #" value={order.product_order_number} onChange={() => handleNewOrderChange('product_order_number', event)}/>
            </div>
            <div>
                <div>
                    <span className="mr-2">Date Received:</span>
                    <input type="date" className="focus:outline-none" value={order.estimated_completion_date} onChange={() => handleNewOrderChange('estimated_completion_date', event)}/>
                </div>
                <div>
                    <span className="mr-2">Confirmed?</span>
                    <label className="mx-2 cursor-pointer"><input className="mr-2" type="radio" value="yes" checked={order.confirmed === "yes"} onChange={() => handleNewOrderChange('confirmed', event)} />Yes</label>
                    <label className="mx-2 cursor-pointer"><input className="mr-2" type="radio" value="no" checked={order.confirmed === "no"} onChange={() => handleNewOrderChange('confirmed', event)} />No</label>
                </div>
            </div>
            <div className="flex items-center ml-auto">
                <input className="text-sm text-white bg-blue-400 hover:bg-blue-700 rounded px-2 cursor-pointer" type="submit" value="Save" onClick={handleNewOrderSubmit}/>
                <input className="text-sm text-blue-400 px-2 ml-1 hover:underline cursor-pointer" type="button" value="Cancel" onClick={closeNewOrderForm}/>
            </div>
        </form>
    </div>
)

export default orderNew;