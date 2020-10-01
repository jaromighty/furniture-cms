import React, { useState } from 'react';
import moment from 'moment';

const orderPendingItem = (props) => {
    const [edit, setEdit] = useState(false);
    return (
        <div className="flex flex-row">
            {edit === false &&
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
            </div>}
            {edit === true &&
            <div className="flex flex-col flex-1 mb-6 rounded-lg bg-white shadow-xl border-l-8 border-blue-400">
                <form className="flex justify-between p-4">
                    <div className="w-64">
                        <input type="text" className="block font-semibold text-lg focus:outline-none placeholder-gray-500" placeholder="Side Mark" value={props.order.side_mark} onChange={() => props.handleEditOrderChange('side_mark', event)} autoFocus/>
                        <input type="text" className="block font-semibold text-sm text-gray-600 uppercase tracking-wide focus:outline-none placeholder-gray-400" placeholder="Product Order #" value={props.order.product_order_number} onChange={() => props.handleEditOrderChange('product_order_number', event)}/>
                    </div>
                    <div>
                        <div>
                            <span className="mr-2">Date Received:</span>
                            <input type="date" className="focus:outline-none" value={props.order.estimated_completion_date} onChange={() => props.handleEditOrderChange('estimated_completion_date', event)}/>
                        </div>
                    </div>
                    <div>
                        <button className="text text-white bg-green-500 hover:bg-green-600 rounded px-3 py-1 cursor-pointer" type="button" onClick={() => {props.handleMarkOrderComfirmed(); setEdit(false)}}>Mark Confirmed</button>
                    </div>
                    <div className="flex items-center ml-auto">
                            <input className="text-sm text-white bg-blue-400 hover:bg-blue-700 rounded px-2 cursor-pointer" type="button" value="Save" onClick={() => {props.handleSubmitEditOrder(); setEdit(false);}} />
                            <input className="text-sm text-blue-400 px-2 ml-1 hover:underline cursor-pointer" type="button" value="Cancel" onClick={() => {setEdit(false); props.handleClearEditOrder();}}/>
                        </div>
                </form>        
            </div>}
            <div className="flex flex-col justify-start mb-6 ml-2">
                <div className="text-gray-500 hover:text-white hover:bg-blue-400 p-2 mt-2 rounded-full cursor-pointer" onClick={() => {setEdit(true); props.handleSetEditOrder(props.order);}}>
                    <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2 4v14h14v-6l2-2v10H0V2h10L8 4H2zm10.3-.3l4 4L8 16H4v-4l8.3-8.3zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"/></svg>
                </div>
                <div className="text-gray-500 hover:text-white hover:bg-red-500 p-2 mt-1 rounded-full cursor-pointer" onClick={ () => { if (window.confirm(`Are you sure you want to delete the order for ${props.order.side_mark}?`)) props.handleDeleteOrder(props.order.id) } }>
                    <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/></svg>
                </div>
            </div>
        </div>
    )
}

export default orderPendingItem;