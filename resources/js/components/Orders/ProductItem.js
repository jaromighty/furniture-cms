import React from 'react';
import moment from 'moment';

const productItem = ({ product, order, updateProgress, deleteProduct }) => {
    let activeStep = void 0;
    if (product.pivot.status === "confirmed") {
        activeStep = 0;
    } else if (product.pivot.status === "designing") {
        activeStep = 1;
    } else if (product.pivot.status === "woodcutting") {
        activeStep = 2;
    } else if (product.pivot.status === "drilling") {
        activeStep = 3;
    } else if (product.pivot.status === "assembling") {
        activeStep = 4;
    } else if (product.pivot.status === "sanding") {
        activeStep = 5;
    } else if (product.pivot.status === "inspecting") {
        activeStep = 6;
    } else if (product.pivot.status === "complete") {
        activeStep = 7;
    } else if (product.pivot.status === 'delivered') {
        activeStep = 8;
    }
    return (
        <div className="p-4 pr-6 border-t border-gray-200">
            <div className="flex flex-row items-center">
                <h5 className="font-base w-32 mr-6">{ product.name }</h5>
                <div className="w-11/12 flex-1 mx-4 -mt-2">
                    <div id="progress" className={`relative ${product.pivot.status}`}>
                        <div className="progress-bar w-full h-6 flex justify-between items-center">
                            <div className={`step relative z-10 cursor-pointer ${activeStep >= 0 ? 'valid' : ''}`} onClick={() => updateProgress("designing", order.id, product.pivot.id)}>
                                <div className="check text-white">
                                    <svg className="fill-current h-2 w-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                                </div>
                                <div className="step-label absolute whitespace-no-wrap text-gray-500 hover:text-gray-700 text-xs font-normal">Confirmed</div>
                            </div>
                            <div className={`step relative z-10 cursor-pointer ${activeStep >= 2 ? 'valid' : ''}`} onClick={() => updateProgress("woodcutting", order.id, product.pivot.id)}>
                                <div className="check text-white">
                                    <svg className="fill-current h-2 w-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                                </div>
                                <div className="step-label absolute whitespace-no-wrap text-gray-500 hover:text-gray-700 text-xs font-normal">Designs</div>
                            </div>
                            <div className={`step relative z-10 cursor-pointer ${activeStep >= 3 ? 'valid' : ''}`} onClick={() => updateProgress("drilling", order.id, product.pivot.id)}>
                                <div className="check text-white">
                                    <svg className="fill-current h-2 w-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                                </div>
                                <div className="step-label absolute whitespace-no-wrap text-gray-500 hover:text-gray-700 text-xs font-normal">Woodcutting</div>
                            </div>
                            <div className={`step relative z-10 cursor-pointer ${activeStep >= 4 ? 'valid' : ''}`} onClick={() => updateProgress("assembling", order.id, product.pivot.id)}>
                                <div className="check text-white">
                                    <svg className="fill-current h-2 w-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                                </div>
                                <div className="step-label absolute whitespace-no-wrap text-gray-500 hover:text-gray-700 text-xs font-normal">Drilling</div>
                            </div>
                            <div className={`step relative z-10 cursor-pointer ${activeStep >= 5 ? 'valid' : ''}`} onClick={() => updateProgress("sanding", order.id, product.pivot.id)}>
                                <div className="check text-white">
                                    <svg className="fill-current h-2 w-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                                </div>
                                <div className="step-label absolute whitespace-no-wrap text-gray-500 hover:text-gray-700 text-xs font-normal">Assembly</div>
                            </div>
                            <div className={`step relative z-10 cursor-pointer ${activeStep >= 6 ? 'valid' : ''}`} onClick={() => updateProgress("inspecting", order.id, product.pivot.id)}>
                                <div className="check text-white">
                                    <svg className="fill-current h-2 w-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                                </div>
                                <div className="step-label absolute whitespace-no-wrap text-gray-500 hover:text-gray-700 text-xs font-normal">Sanding</div>
                            </div>
                            <div className={`step relative z-10 cursor-pointer ${activeStep >= 7 ? 'valid' : ''}`} onClick={() => updateProgress("complete", order.id, product.pivot.id)}>
                                <div className="check text-white">
                                    <svg className="fill-current h-2 w-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                                </div>
                                <div className="step-label absolute whitespace-no-wrap text-gray-500 hover:text-gray-700 text-xs font-normal">Final Inspection</div>
                            </div>
                            <div className={`step relative z-10 cursor-pointer ${activeStep >= 7 ? 'valid' : ''}`} onClick={() => updateProgress("complete", order.id, product.pivot.id)}>
                                <div className="check text-white">
                                    <svg className="fill-current h-2 w-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                                </div>
                                <div className="step-label absolute whitespace-no-wrap text-gray-500 hover:text-gray-700 text-xs font-normal">Complete</div>
                            </div>
                            <div className={`step relative z-10 cursor-pointer ${activeStep >= 8 ? 'valid' : ''}`} onClick={() => updateProgress("delivered", order.id, product.pivot.id)}>
                                <div className="check text-white">
                                    <svg className="fill-current h-2 w-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                                </div>
                                <div className="step-label absolute whitespace-no-wrap text-gray-500 hover:text-gray-700 text-xs font-normal">Delivered</div>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="italic w-20 ml-6 text-center">
                    { product.pivot.status.charAt(0).toUpperCase() + product.pivot.status.slice(1) }
                    { product.pivot.completed_at && <div>{ moment(product.pivot.completed_at).format('L') }</div> }
                    { product.pivot.delivered_at && <div>{ moment(product.pivot.delivered_at).format('L') }</div> }
                </span>
            </div>
            <div className="flex mt-4 pt-2 text-sm text-gray-600">
                <div className="w-3/4">{ product.pivot.notes }</div>
                <div className="flex-1 flex justify-end">
                    {/* <div className="text-gray-500 hover:text-white hover:bg-blue-400 p-2 ml-2 rounded-full cursor-pointer">
                        <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2 4v14h14v-6l2-2v10H0V2h10L8 4H2zm10.3-.3l4 4L8 16H4v-4l8.3-8.3zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"/></svg>
                    </div> */}
                    <div className="text-gray-500 hover:text-white hover:bg-red-500 p-2 ml-2 rounded-full cursor-pointer" onClick={ () => { if (window.confirm(`Are you sure you want to delete the ${product.name} from ${order.side_mark}'s order?`)) deleteProduct(product.pivot.id, order.id) }}>
                        <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/></svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default productItem;