import React, { Component } from 'react';
import Http from '../Http';

import ProductItem from '../components/Products/ProductItem';

class Products extends Component {
    state = {
        products: [],
        product: null,
        newProductForm: false,
        error: null,
    }
    // API endpoint.
    api = '/api/v1/products';

    componentDidMount() {
        Http.get(this.api)
            .then((response) => {
                const { data } = response.data;
                this.setState({
                    products: data, error: false,
                });
            })
            .catch(() => {
                this.setState({
                    error: 'Unable to fetch data.',
                });
            });
    }

    openNewProductForm = (e) => {
        e.preventDefault();
        this.setState({ newProductForm: true });
    }
    closeNewProductForm = (e) => {
        e.preventDefault();
        this.setState({ newProductForm: false });
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { product } = this.state;
        this.addProduct(product);
    }
    addProduct = (product) => {
        Http.post(this.api, { name: product })
            .then(({ data }) => {
                const newItem = {
                    id: data.id,
                    name: product,
                };
                const allProducts = [newItem, ...this.state.products];
                this.setState({ products: allProducts, product: null, newProductForm: false });
                this.ProductForm.reset();
            })
            .catch(() => {
                this.setState({
                    error: 'Sorry, there was an error saving the product.',
                });
            });
    }
    handleSetEditProduct = (product) => {
        this.setState({ product: product });
    }
    handleClearEditProduct = () => {
        this.setState({ product: null });
    }
    handleProductUpdate = (prop, e) => {
        const { product } = this.state;
        product[prop] = e.target.value;
        this.setState({ product: product });
    }
    handleSubmitProduct = () => {
        const currentProduct = this.state.product;
        Http.put(`/api/v1/products/${currentProduct.id}`, currentProduct)
            .then(() => {
                const { products } = this.state;
                let currentProductIndex = products.findIndex(product => product.id === currentProduct.id);
                products[currentProductIndex] = currentProduct;
                this.setState({ products: products });
            });
    }
    destroyProduct = (product) => {
        const { id } = product;
        const { products } = this.state;

        Http.delete(`${this.api}/${id}`)
            .then(() => {
                const updatedProducts = products.filter(product => product.id !== id);
                this.setState({ products: updatedProducts });
            })
            .catch(() => {
                this.setState({
                    error: 'Sorry, there was an error closing your to do.',
                });
            });
    }

    render() {
        const { products } = this.state;
        return (
            <div className="pt-20 lg:pt-28 w-full">
                <div className="bg-white shadow-lg p-8 mt-8 mx-64 rounded-lg">
                    <div className="flex items-center mb-5">
                        <h1 className="font-display text-2xl font-bold">My Products</h1>
                        <div className="ml-auto"><button className="bg-blue-400 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none" onClick={this.openNewProductForm}>Add a Product</button></div>
                    </div>
                    {this.state.newProductForm &&
                        <div className="flex items-center border-t border-gray-300 py-3 px-4 font-body">
                            <form className="flex items-center w-full" onSubmit={this.handleSubmit} ref={(el) => { this.productForm = el; }}>
                                <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-2 -ml-2 block w-64 appearance-none leading-normal" type="text" name="product" onChange={this.handleChange} autoFocus />
                                <div className="ml-auto">
                                    <input className="text-sm text-white bg-blue-400 hover:bg-blue-700 rounded-lg py-1 px-2 cursor-pointer" type="submit" value="Save"/>
                                    <input className="text-sm text-blue-400 py-1 px-2 ml-1 hover:underline cursor-pointer" type="button" value="Cancel" onClick={this.closeNewProductForm}/>
                                </div>
                            </form>
                        </div>
                    }
                    {products.map(product => (
                    <ProductItem product={product} key={product.id}
                        handleSetEditProduct={this.handleSetEditProduct}
                        handleProductUpdate={this.handleProductUpdate}
                        handleClearEditProduct={this.handleClearEditProduct}
                        handleSubmitProduct={this.handleSubmitProduct}
                        destroyProduct={this.destroyProduct} />
                    ))}
                </div>
            </div>
        );
    }
}

export default Products;