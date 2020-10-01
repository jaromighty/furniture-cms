import React, { Component } from 'react';
import { connect } from 'react-redux';
import Http from './Http';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

class Base extends Component {
    state = {
        clients: []
    }
    componentDidMount() {
        Http.get(`/api/v1/clients`)
            .then((response) => {
                const { data } = response.data;
                this.setState({
                    clients: data, error: false,
                });
            })
            .catch(() => {
                this.setState({
                    error: 'Unable to fetch data.',
                });
            });
    }
    render() {
        const { clients } = this.state;
        return (
            <div className="h-screen flex flex-col">
                <div>
                    <Header />
                </div>
                <main className="w-full max-w-screen-xl mx-auto px-6 mt-12">
                    <div className="lg:flex -mx-6">
                        {this.props.isAuthenticated && (this.props.user.role === "admin" && <Sidebar clients={clients} />)}
                        <div className="min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-full">
                            {this.props.children}
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
});

export default connect(mapStateToProps)(Base);
