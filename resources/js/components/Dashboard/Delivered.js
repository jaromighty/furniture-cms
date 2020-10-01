import React from 'react';

import ReadOnlyOrderDeliveredItem from '../Orders/ReadOnlyOrderDeliveredItem';

const delivered = ({ client, handleViewProducts }) => (
    <div className="mt-8">
            <div className="flex items-start">
                <h3 id="delivered-orders" className="mb-4 font-semibold text-sm text-gray-800 uppercase tracking-wider">Delivered Orders</h3>
            </div>
            {client.orders.map(
                (order, index) => {
                    if (order.status === "delivered") {
                        return <ReadOnlyOrderDeliveredItem key={index} index={index} order={order}
                                    handleViewProducts={handleViewProducts} />
                    }
                })
            }
    </div>
);

export default delivered;