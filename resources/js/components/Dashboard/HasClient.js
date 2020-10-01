import React from 'react';

import Empty from './Empty';
import NotEmpty from './NotEmpty';

const hasClient = ({ client, empty, working, delivered, handleViewProducts }) => (
    <>
        {empty && <Empty name={client.name} />}
        {!empty && 
        <NotEmpty 
            client={client}
            working={working}
            delivered={delivered}
            handleViewProducts={handleViewProducts}
        />}
    </>
);

export default hasClient;