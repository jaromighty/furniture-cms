import React from 'react';

const noClient = () => (
    <>
        <div>
            <img className="w-1/4 h-1/4 mx-auto mt-12" src="/no-client.svg" alt="No Orders"/>
        </div>
        <div className="mt-8 text-center">
            <p className="pb-4">It looks like we currently don't have you assigned to a client.</p>
        </div>
    </>
);

export default noClient;