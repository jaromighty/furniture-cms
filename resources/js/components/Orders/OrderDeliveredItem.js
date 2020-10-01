import React from 'react';
import moment from 'moment';

const orderDeliveredItem = (props) => (
    <div className="flex flex-col mb-6 rounded-lg bg-white shadow-xl border-l-8 border-green-500 mr-10">
        <div className="flex flex-row justify-between p-4 pr-6">
            <h4 className="font-semibold text-lg w-64">
                { props.order.side_mark }
                <span className="block text-sm text-gray-600 uppercase tracking-wide">{ props.order.product_order_number }</span>    
            </h4>
            <span>Total Products: { props.order.products.length }</span>
            <div className="w-56 text-right">
                <span className="block">Delivered: { moment.utc(props.order.delivered_at).format('MMM D, YYYY') }</span>
                <span className="block text-sm text-gray-600">{ moment.utc(props.order.delivered_at).fromNow() }</span>    
            </div>
        </div>
    </div>
);

export default orderDeliveredItem;