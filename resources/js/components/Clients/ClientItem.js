import React, { useState } from 'react';

const clientItem = (props) => {
    const [edit, setEdit] = useState(false);
    return (
        <div className="border-t border-gray-300">
            {edit === false &&
            <div className="flex items-center py-3 px-4 font-body">
                <div>{props.client.name}</div>
                <div className="ml-auto flex">
                    <div className="text-gray-500 hover:text-white hover:bg-blue-400 p-2 -m-2 rounded-full cursor-pointer" onClick={() => {props.handleSetEditClient(props.client); setEdit(true)}}>
                        <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2 4v14h14v-6l2-2v10H0V2h10L8 4H2zm10.3-.3l4 4L8 16H4v-4l8.3-8.3zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"/></svg>
                    </div>
                    <div className="text-gray-500 hover:text-white hover:bg-red-500 p-2 -m-2 ml-2 rounded-full cursor-pointer" onClick={() => props.destroyClient(props.client)}>
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" /></svg>
                    </div>
                </div>
            </div>}
            {edit === true &&
            <form>
                <div className="flex items-center py-3 px-4 font-body">
                    <div className="flex-1">
                        <input type="text" value={props.client.name} className="focus:outline-none" onChange={() => props.handleClientUpdate('name', event)} autoFocus />
                    </div>
                    <div>
                        <input className="text-sm text-white bg-blue-400 hover:bg-blue-700 rounded px-2 cursor-pointer" type="button" value="Save" onClick={() => {props.handleSubmitClient(); setEdit(false);}} />
                        <input className="text-sm text-blue-400 px-2 ml-1 hover:underline cursor-pointer" type="button" value="Cancel" onClick={() => {props.handleClearEditClient(); setEdit(false);}}/>
                    </div>
                </div>
            </form>}
        </div>
    );
}

export default clientItem;