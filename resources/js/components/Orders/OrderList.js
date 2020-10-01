import React, { Component } from 'react';
import Http from '../../Http';

import OrderNew from './OrderNew';
import OrderItem from './OrderItem';
import OrderPendingItem from './OrderPendingItem';
import OrderDeliveredItem from './OrderDeliveredItem';

class OrderList extends Component {
    state = {
        client: null,
        emptyState: true,
        loading: true,
        newOrder: false,
        newProduct: false,
        order: {
            id: null,
            client_id: null,
            side_mark: '',
            status: 'confirmed',
            product_order_number: '',
            estimated_completion_date: '',
            confirmed: 'yes'
        },
        orderBeingEdited: {},
        products: [],
        product: {
            name: null,
            order_id: null,
            product_id: null,
            status: 'confirmed',
            notes: null,
            pivot: {},
        }
    }
    componentDidMount() {
        this.initClient(this.props.match.params.slug);
        Http.get('/api/v1/products')
            .then(response => {
                const { data } = response.data;
                this.setState({ products: data });
            })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.slug !== prevProps.match.params.slug) {
            this.initClient(this.props.match.params.slug);
        }
    }
    initClient = (slug) => {
        Http.get(`/api/v1/clients/${slug}`)
            .then((response) => {
                const { data } = response.data;
                if (data.orders) {
                    this.setState({ client: data, loading: false, emptyState: false });
                } else {
                    this.setState({ loading: false });
                }
            });
    }
    openNewOrderForm = (e) => {
        e.preventDefault();
        this.setState({ newOrder: true, emptyState: false });
    }
    closeNewOrderForm = (e) => {
        e.preventDefault();
        this.setState({ newOrder: false });
        if (this.state.client.orders.length <= 0) {
            this.setState({ emptyState:true });
        }
    }
    openNewProductForm = (index) => {
        let newProductForm = document.querySelector(`#newProductForm-${index}`);
        newProductForm.classList.remove('hidden');
    }
    closeNewProductForm = (index) => {
        let newProductForm = document.querySelector(`#newProductForm-${index}`);
        newProductForm.classList.add('hidden');
        let { product } = this.state;
        product.product_id = null;
        product.notes = null;
        product.status = 'confirmed';
        this.setState({ product: product });
    }
    handleNewOrderChange = (prop, e) => {
        const updatedNewOrderForm = { ...this.state.order };
        updatedNewOrderForm[prop] = e.target.value;
        this.setState({ order: updatedNewOrderForm });
    }
    handleNewOrderSubmit = (e) => {
        e.preventDefault();
        let newOrder = { ...this.state.order };
        newOrder.client_id = this.state.client.id;
        if (newOrder.confirmed === "yes") {
            newOrder.status = 'working';
        } else if (newOrder.confirmed === "no") {
            newOrder.status = 'pending';
        }
        newOrder.products = [];
        Http.post('/api/v1/orders', newOrder)
            .then(response => {
                const updatedClient = { ...this.state.client };
                updatedClient.orders.push(response.data.order);
                this.setState({ newOrder: false, client: updatedClient });
            });
        
    }
    handleDeleteOrder = (orderId) => {
        Http.delete(`/api/v1/orders/${orderId}`)
            .then(response => {
                let { client } = this.state;
                client.orders = client.orders.filter(order => order.id !== orderId);
                this.setState({ client: client });
            });
    }
    handleDeleteProductFromOrder = (pivotId, orderId) => {
        Http.delete(`/api/v1/orders/delete-product/${orderId}/${pivotId}`)
            .then(response => {
                let { client } = this.state;
                let currentOrderIndex = client.orders.findIndex(order => order.id === orderId);
                client.orders[currentOrderIndex].products = client.orders[currentOrderIndex].products.filter(product => product.pivot.id !== pivotId);
                this.setState({ client: client });
            });
        
    }
    handleNewProductFormChange = (prop, e) => {
        const updatedNewProductForm = { ...this.state.product };
        updatedNewProductForm[prop] = e.target.value;
        this.setState({ product: updatedNewProductForm });
    }
    handleNewProductSubmit = (id, index, e) => {
        e.preventDefault();
        let newProduct = { ...this.state.product };
        newProduct.order_id = id;
        Http.post('/api/v1/orders/add-product', newProduct)
            .then(response => {
                newProduct = response.data.data.products[response.data.data.products.length - 1];
                const updatedClient = { ...this.state.client };
                let orderIndex = updatedClient.orders.indexOf(updatedClient.orders.find(order => order.id === id));
                updatedClient.orders[orderIndex].products.push(newProduct);
                this.setState({ client: updatedClient });
                this.closeNewProductForm(index);
            });
    }
    handleViewProducts = (index) => {
        let products = document.querySelector(`#products-${index}`);
        products.classList.toggle('hidden');
    }
    handleUpdateProductProgress = (step, orderId, pivotId) => {
        Http.put(`/api/v1/orders/update-product/${orderId}/${pivotId}`, { status: step })
            .then(() => {
                let { client } = this.state;
                let currentOrderIndex = client.orders.findIndex(order => order.id === orderId);
                let currentProducts = client.orders[currentOrderIndex].products;
                let currentProductIndex = currentProducts.findIndex(product => product.pivot.id === pivotId);
                currentProducts[currentProductIndex].pivot.status = step;
                client.orders[currentOrderIndex].products = currentProducts;
                this.setState({ client: client });
            });
        
    }
    handleSetEditOrder = (order) => {
        this.setState({
            orderBeingEdited: order
        });
    }
    handleClearEditOrder = () => {
        this.setState({
            orderBeingEdited: {}
        });
    }
    handleEditOrderChange = (prop, e) => {
        const { orderBeingEdited } = this.state;
        orderBeingEdited[prop] = e.target.value;
        this.setState({orderBeingEdited});
    }
    handleSubmitEditOrder = () => {
        const { orderBeingEdited } = this.state;
        Http.put(`/api/v1/orders/${orderBeingEdited.id}`, orderBeingEdited)
            .then(() => {
                let { client } = this.state;
                let currentOrderIndex = client.orders.findIndex(order => order.id === orderBeingEdited.id);
                client.orders[currentOrderIndex] = orderBeingEdited;
                this.setState({ client });
            });
    }
    handleMarkOrderComfirmed = () => {
        const { orderBeingEdited } = this.state;
        orderBeingEdited.confirmed_at = new Date().toISOString().slice(0,10);
        orderBeingEdited.status = "working";
        this.setState({ orderBeingEdited });
        this.handleSubmitEditOrder();
    }
    handleMarkOrderDelivered = () => {
        const { orderBeingEdited } = this.state;
        orderBeingEdited.delivered_at = new Date().toISOString().slice(0,10);
        orderBeingEdited.status = "delivered";
        this.setState({ orderBeingEdited });
        this.handleSubmitEditOrder();
    }
    render() {
        const { loading, order, products, product } = this.state;
        return (
            <div className="flex">
                {loading &&
                <div className="pt-20 lg:pt-28 w-full">
                    <div className="flex items-center justify-center max-w-5xl h-64">
                        <svg className="w-12 h-12 fill-current text-gray-800 spin" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>
                    </div>
                </div>}
                {!loading &&
                <div className="pt-20 lg:pt-28 w-full">
                    <div className="mb-6 px-6 max-w-4xl mx-auto lg:ml-0 lg:mr-auto xl:mx-0">
                        <h1 className="text-2xl font-bold my-6">{this.state.client.name} Orders</h1>
                    </div>
                    <div className="flex">
                        <div className="px-6 w-full max-w-6xl mx-auto lg:ml-0 lg:mr-auto xl:mx-0">
                            {this.state.emptyState &&
                            <div>
                                <div>
                                    <img className="w-1/2 h-1/2 mx-auto" src="/undraw_empty_xct9.svg" alt="No Orders"/>
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="pb-4">It looks like you don't have any orders for {this.state.client.name}.</p>
                                    <button className="bg-blue-400 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none" onClick={this.openNewOrderForm}>Add an order</button>
                                </div>
                            </div>}
                            <div className="mb-12">
                                {!this.state.emptyState &&
                                <div className="flex items-start justify-between">
                                    <h3 id="working-orders" className="mb-4 font-semibold text-sm text-gray-800 uppercase tracking-wider">Working Orders</h3>
                                    <button className="flex justify-center items-center bg-blue-400 h-8 w-8 rounded-lg shadow hover:bg-blue-700 text-white -mt-2 mr-10 focus:outline-none" onClick={this.openNewOrderForm}>
                                        <svg className="fill-current h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/></svg>
                                    </button>
                                </div>}
                                {this.state.newOrder && <OrderNew order={order} handleNewOrderChange={this.handleNewOrderChange} handleNewOrderSubmit={this.handleNewOrderSubmit} closeNewOrderForm={this.closeNewOrderForm} />}
                                {!this.state.emptyState && this.state.client.orders.map(
                                    (order, index) => {
                                        if (order.status === "working") {
                                            return <OrderItem key={index} index={index} order={order} products={products} product={product}
                                                newProduct={this.state.newProduct}
                                                handleViewProducts={this.handleViewProducts}
                                                openNewProductForm={this.openNewProductForm}
                                                closeNewProductForm={this.closeNewProductForm}
                                                closeNewOrderForm={this.closeNewProductForm}
                                                updateProgress={this.handleUpdateProductProgress}
                                                handleDeleteOrder={this.handleDeleteOrder}
                                                handleDeleteProductFromOrder={this.handleDeleteProductFromOrder}
                                                handleNewProductFormChange={this.handleNewProductFormChange}
                                                handleNewProductSubmit={this.handleNewProductSubmit}
                                                handleEditOrderChange={this.handleEditOrderChange}
                                                handleSetEditOrder={this.handleSetEditOrder}
                                                handleClearEditOrder={this.handleClearEditOrder}
                                                handleSubmitEditOrder={this.handleSubmitEditOrder}
                                                handleMarkOrderDelivered={this.handleMarkOrderDelivered} />
                                        } else if (order.status === "pending") {
                                            return <OrderPendingItem key={index} index={index} order={order} products={products} product={product}
                                                newProduct={this.state.newProduct}
                                                handleViewProducts={this.handleViewProducts}
                                                openNewProductForm={this.openNewProductForm}
                                                closeNewProductForm={this.closeNewProductForm}
                                                closeNewOrderForm={this.closeNewProductForm}
                                                updateProgress={this.handleUpdateProductProgress}
                                                handleDeleteOrder={this.handleDeleteOrder}
                                                handleDeleteProductFromOrder={this.handleDeleteProductFromOrder}
                                                handleNewProductFormChange={this.handleNewProductFormChange}
                                                handleNewProductSubmit={this.handleNewProductSubmit}
                                                handleEditOrderChange={this.handleEditOrderChange}
                                                handleSetEditOrder={this.handleSetEditOrder}
                                                handleClearEditOrder={this.handleClearEditOrder}
                                                handleSubmitEditOrder={this.handleSubmitEditOrder}
                                                handleMarkOrderComfirmed={this.handleMarkOrderComfirmed} />
                                        }
                                    })}
                            </div>
                            {this.state.client.orders &&
                            <div>
                                <h3 id="delivered-orders" className="mb-4 font-semibold text-sm text-gray-800 uppercase tracking-wider">Delivered Orders</h3>
                                {this.state.client.orders.map((order, index) => {
                                    if (order.status === "delivered") {
                                        return <OrderDeliveredItem key={`d${index}`} order={order} />
                                    }
                                })}
                            </div>}
                        </div>
                        <div className="hidden xl:text-sm xl:block xl:w-1/4 xl:px-6">
                            <div className="flex flex-col justify-between overflow-y-auto sticky top-16 max-h-(screen-16) pt-12 pb-4 -mt-12">
                                <h4 className="text-gray-500 uppercase tracking-wide font-bold text-sm lg:text-xs">On this page</h4>
                                <ul className="mt-4 overflow-x-hidden">
                                    <li className="mb-2"><a href="#working-orders" className="block transition-fast hover:translate-r-2px hover:text-gray-900 text-gray-600">Working Orders</a></li>
                                    <li className="mb-2"><a href="#delivered-orders" className="block transition-fast hover:translate-r-2px hover:text-gray-900 text-gray-600">Delivered Orders</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

export default OrderList;