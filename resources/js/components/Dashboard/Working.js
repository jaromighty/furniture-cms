import React from 'react';

import ReadOnlyOrderItem from '../Orders/ReadOnlyOrderItem';
import ReadOnlyOrderPendingItem from '../Orders/ReadOnlyOrderPendingItem';

const working = ({ client, handleViewProducts }) => (
    <div>
        <div className="flex items-start">
            <h3 id="working-orders" className="mb-4 font-semibold text-sm text-gray-800 uppercase tracking-wider">Working Orders</h3>
        </div>
        {client.orders.map(
            (order, index) => {
                if (order.status === "working") {
                    return <ReadOnlyOrderItem key={index} index={index} order={order} handleViewProducts={handleViewProducts} />
                } else if (order.status === "pending") {
                    return <ReadOnlyOrderPendingItem key={index} index={index} order={order} />
                }
            })
        }
    </div>
);

export default working;