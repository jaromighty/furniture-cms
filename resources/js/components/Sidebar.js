import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const sidebar = (props) => {
    return (
        <div className="hidden fixed inset-0 pt-16 h-full z-90 w-full border-b -mb-16 lg:-mb-0 lg:static lg:h-auto lg:overflow-y-visible lg:border-b-0 lg:pt-0 lg:w-1/4 lg:block lg:border-0 xl:w-1/5">
            <div className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:top-16 bg-white lg:bg-transparent">
                <nav className="px-6 pt-6 overflow-y-auto text-base lg:text-sm lg:py-12 lg:pl-6 lg:pr-8 sticky?lg:h-(screen-16)">
                    <div className="mb-10">
                        <NavLink className="flex items-center px-2 -mx-2 py-1 hover:bg-gray-300 font-medium rounded-lg text-gray-900" exact activeClassName="bg-gray-400" to="/">
                            <span>
                                <svg className="w-5 h-5 fill-current text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-5.6-4.29a9.95 9.95 0 0 1 11.2 0 8 8 0 1 0-11.2 0zm6.12-7.64l3.02-3.02 1.41 1.41-3.02 3.02a2 2 0 1 1-1.41-1.41z" /></svg>
                            </span>
                            <span className="ml-3 text-gray-900">Dashboard</span>
                        </NavLink>
                        <NavLink className="flex items-center px-2 -mx-2 mt-2 py-1 hover:bg-gray-300 font-medium rounded-lg text-gray-900" exact activeClassName="bg-gray-400" to="/clients">
                            <span>
                                <svg className="w-5 h-5 fill-current text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z"/></svg>
                            </span>
                            <span className="ml-3 text-gray-900">Clients</span>
                        </NavLink>
                        <NavLink className="flex items-center px-2 -mx-2 mt-2 py-1 hover:bg-gray-300 font-medium rounded-lg text-gray-900" exact activeClassName="bg-gray-400" to="/products">
                            <span>
                                <svg className="w-5 h-5 fill-current text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M160 224v64h320v-64c0-35.3 28.7-64 64-64h32c0-53-43-96-96-96H160c-53 0-96 43-96 96h32c35.3 0 64 28.7 64 64zm416-32h-32c-17.7 0-32 14.3-32 32v96H128v-96c0-17.7-14.3-32-32-32H64c-35.3 0-64 28.7-64 64 0 23.6 13 44 32 55.1V432c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16v-16h384v16c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16V311.1c19-11.1 32-31.5 32-55.1 0-35.3-28.7-64-64-64z"/></svg>
                            </span>
                            <span className="ml-3 text-gray-900">Products</span>
                        </NavLink>
                        <NavLink className="flex items-center px-2 -mx-2 mt-2 py-1 hover:bg-gray-300 font-medium rounded-lg text-gray-900" exact activeClassName="bg-gray-400" to="/users">
                            <span>
                                <svg className="w-5 h-5 fill-current text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 5a5 5 0 0 1 10 0v2A5 5 0 0 1 5 7V5zM0 16.68A19.9 19.9 0 0 1 10 14c3.64 0 7.06.97 10 2.68V20H0v-3.32z"/></svg>
                            </span>
                            <span className="ml-3 text-gray-900">Users</span>
                        </NavLink>
                    </div>
                    <h2 className="flex items-center text-sm lg:text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3 lg:mb-2">
                        <span>Orders</span>
                    </h2>
                    {props.clients.map(client => (
                        <NavLink className="flex items-center -mx-2 py-1 px-3 mb-3 lg:mb-1 transition-fast text-sm font-medium rounded-lg hover:bg-gray-300" activeClassName="bg-gray-400" to={`/orders/${client.slug}`} key={client.id}>{client.name}</NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
}

export default sidebar;