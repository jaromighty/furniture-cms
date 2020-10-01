import React from 'react';

import NoClient from './NoClient';
import HasClient from './HasClient';

const notLoading = ({ client, empty, noClient, working, delivered, handleViewProducts }) => (
    <>
        {noClient && <NoClient />}
        {!noClient &&
        <HasClient
            client={client}
            empty={empty}
            working={working}
            delivered={delivered}
            handleViewProducts={handleViewProducts}
        />}
    </>
);

export default notLoading;