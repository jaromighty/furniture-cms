import React from 'react';
import moment from 'moment';

const readOnlyOrderPendingItem = (props) => (
    <div className="flex flex-row">
        <div className="flex flex-col flex-1 mb-6 rounded-lg bg-white shadow-xl border-l-8 border-blue-disabled">
            <div className="flex flex-row justify-between p-4 pr-6 cursor-not-allowed">
                <h4 className="font-semibold text-gray-500 text-lg w-64">
                    { props.order.side_mark }
                    <span className="block text-sm text-gray-400 uppercase tracking-wide">{ props.order.product_order_number }</span>    
                </h4>
                <span className="flex items-center font-bold text-2xl uppercase text-gray-500">Order Pending</span>
                <div className="w-56 text-right">
                    <span className="block text-gray-500">Date Received: { moment(props.order.estimated_completion_date).format('MMM D, YYYY') }</span>
                    <span className="block text-sm text-gray-400">{ moment(props.order.estimated_completion_date).fromNow() }</span>    
                </div>
            </div>
        </div>
    </div>
);

export default readOnlyOrderPendingItem;