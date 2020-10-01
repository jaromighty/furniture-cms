import React from 'react';

const productNew = ({ index, products, singleProduct, orderId, closeNewProductForm, handleNewProductFormChange, handleNewProductSubmit }) => (
    <div id={`newProductForm-${index}`} className="hidden p-4 pr-6 border-t border-gray-200">
        <form className="flex flex-row items-center">
            <div className="flex flex-col flex-1">
                <div className="flex mb-4">
                    <select className="font-base w-48 mr-8 focus:outline-none cursor-pointer" defaultValue="" onChange={() => handleNewProductFormChange('product_id', event)}>
                        <option value="" disabled>Choose product</option>
                        {products.map((product, index) => <option key={index} value={product.id}>{product.name}</option> )}
                    </select>
                    <div>
                        <label className="mx-2 cursor-pointer"><input className="mr-2" type="radio" checked={singleProduct.status === 'pending'} value="pending" onChange={() => handleNewProductFormChange('status', event)} />Pending</label>
                        <label className="mx-2 cursor-pointer"><input className="mr-2" type="radio" checked={singleProduct.status === 'confirmed'} value="confirmed" onChange={() => handleNewProductFormChange('status', event)} />Confirmed</label>
                    </div>
                </div>
<textarea name="notes" className="text-sm text-gray-600 focus:outline-none" placeholder="Product notes" onChange={() => handleNewProductFormChange('notes', event)}>{singleProduct.notes}</textarea>
            </div>
            <div className="ml-8">
                <input className="text-sm text-white bg-blue-400 hover:bg-blue-700 rounded px-2 cursor-pointer" type="submit" value="Save" onClick={() => handleNewProductSubmit(orderId, index, event)} />
                <input className="text-sm text-blue-400 px-2 ml-1 hover:underline cursor-pointer focus:outline-none" type="button" value="Cancel" onClick={() => closeNewProductForm(index)}/>
            </div>
        </form>
    </div>
);

export default productNew;