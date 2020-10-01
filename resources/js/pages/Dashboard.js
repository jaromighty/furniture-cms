import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from '../components/Dashboard/Loading';
import NotLoading from '../components/Dashboard/NotLoading';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        // Initial state.
        this.state = {
            loading: true,
            error: false,
            client: null,
            empty: false,
            noClient: false,
            showWorking: false,
            showDelivered: false,
        };

        // API endpoint.
        this.api = '/api/v1';
    }

    componentDidMount() {
        if (this.props.user.role === "designer") {
            this.setState({
                client: this.props.user.client,
                loading: false,
            });
            if (this.props.user.client !== null) {
                if (this.props.user.client.orders.length > 0) {
                    for (let order of this.props.user.client.orders) {
                        if (order.status === 'delivered') {
                            this.setState({ showDelivered: true });
                        } else if (order.status !== 'delivered') {
                            this.setState({ showWorking: true });
                        }
                    }
                } else {
                    this.setState({ empty: true });
                }
            } else {
                this.setState({ noClient: true });
            }
        }
    }

    handleViewProducts = (index) => {
        let products = document.querySelector(`#products-${index}`);
        products.classList.toggle('hidden');
    }

    render() {
        const { loading, client, empty, noClient, showWorking, showDelivered } = this.state;
        return (
            <div className="flex flex-1 w-full">
                <div className="pt-20 lg:pt-28 w-full">
                    {loading && <Loading />}
                    {!loading &&
                    <NotLoading
                        client={client}
                        noClient={noClient}
                        empty={empty}
                        working={showWorking}
                        delivered={showDelivered}
                        handleViewProducts={this.handleViewProducts}
                    />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
});

export default connect(mapStateToProps)(Dashboard);
