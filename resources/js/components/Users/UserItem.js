import React, { useState } from 'react';

const userItem = (props) => {
    const [edit, setEdit] = useState(false);
    return (
        <div className="border-t border-gray-300">
            {edit === false &&
            <div className="flex items-center justify-between py-3 px-4 font-body">
                <div>{ props.user.name }</div>
            {props.user.role === "designer" && props.user.client ? <div className="text-gray-700">{props.user.client.name}</div> : null}
                <div className="flex">
                    <div className="text-gray-500 hover:text-white hover:bg-blue-400 p-2 -m-2 rounded-full cursor-pointer" onClick={() => {props.handleSetEditUser(props.user); setEdit(true)}}>
                        <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2 4v14h14v-6l2-2v10H0V2h10L8 4H2zm10.3-.3l4 4L8 16H4v-4l8.3-8.3zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"/></svg>
                    </div>
                    <div className="text-gray-500 hover:text-white hover:bg-red-500 p-2 -m-2 ml-2 rounded-full cursor-pointer" onClick={() => props.destroyUser(props.user)}>
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/></svg>
                    </div>
                </div>
            </div>}
            {edit === true &&
            <form>
                <div className="flex items-center justify-between py-3 px-4 font-body">
                    <div>
                        <input type="text" value={props.user.name} className="focus:outline-none" onChange={() => props.handleUserUpdate('name', event)} autoFocus />
                    </div>
                    {props.user.role === "designer" &&
                        <div className="relative">
                            <select className="block appearance-none text-gray-700 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="client" defaultValue={""} value={props.user.client.id} onChange={() => props.handleUserUpdate('client', event)}>
                                <option value="" disabled>Client</option>
                                {props.clients.map(client => (
                                    <option value={client.id} key={client.id}>{client.name}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center p-2 -m-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>}
                    <div>
                        <input className="text-sm text-white bg-blue-400 hover:bg-blue-700 rounded px-2 cursor-pointer" type="button" value="Save" onClick={() => {props.handleSubmitUser(); setEdit(false);}} />
                        <input className="text-sm text-blue-400 bg-transparent pl-2 ml-1 hover:underline cursor-pointer" type="button" value="Cancel" onClick={() => {props.handleClearEditUser(); setEdit(false);}}/>
                    </div>
                </div>
            </form>}
        </div>
    );
}

export default userItem;