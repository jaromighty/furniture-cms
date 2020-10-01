import React from 'react';
import moment from 'moment';

import ReadOnlyProductItem from './ReadOnlyProductItem';
import ReadOnlyProductEmpty from './ReadOnlyProductEmpty';

const readOnlyOrderItem = (props) => (
    <div className="flex flex-row">
        <div className="flex flex-col flex-1 mb-6 rounded-lg bg-white shadow-xl border-l-8 border-blue-400">
            <div className="flex flex-row justify-between p-4 pr-6 cursor-pointer" onClick={() => props.handleViewProducts(props.index)}>
                <h4 className="font-semibold text-lg w-64">
                    { props.order.side_mark }
                    <span className="block text-sm text-gray-600 uppercase tracking-wide">{ props.order.product_order_number }</span>    
                </h4>
                <span>Total Products: { props.order.products.length }</span>
                <div className="w-56 text-right">
                    <span className="block">Date Received: { moment.utc(props.order.estimated_completion_date).format('MMM D, YYYY') }</span>
                    <span className="block text-sm text-gray-600">{ moment.utc(props.order.estimated_completion_date).fromNow() }</span>    
                </div>
            </div>
            <div id={`products-${props.index}`} className="hidden">
                { props.order.products.length ? props.order.products.map((product, index) => <ReadOnlyProductItem key={index} product={product} order={props.order} />) : <ReadOnlyProductEmpty /> }
            </div>
        </div>
    </div>
);

export default readOnlyOrderItem;