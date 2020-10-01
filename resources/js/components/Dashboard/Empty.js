import React from 'react';

const empty = ({ name }) => (
    <>
        <div>
            <img className="w-1/3 h-1/3 mx-auto mt-12" src="/undraw_empty_xct9.svg" alt="No Orders"/>
        </div>
        <div className="mt-4 text-center">
            <p className="pb-4">It looks like we currently don't have any orders for {name}</p>
        </div>
    </>
);

export default empty;