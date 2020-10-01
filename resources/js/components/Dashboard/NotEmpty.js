import React from 'react';

import Working from './Working';
import Delivered from './Delivered';

const notEmpty = ({ client, working, delivered, handleViewProducts }) => (
    <div className="px-20">
        <div className="mb-6">
            <h1 className="text-2xl font-bold my-6">{client.name} Orders</h1>
        </div>
        {working && <Working client={client} handleViewProducts={handleViewProducts} />}
        {delivered && <Delivered client={client} handleViewProducts={handleViewProducts} />}
    </div>
);

export default notEmpty;