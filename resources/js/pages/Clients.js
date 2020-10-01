import React, { Component } from 'react';
import { connect } from 'react-redux';
import Http from '../Http';

import ClientItem from '../components/Clients/ClientItem';

class Clients extends Component {
    state = {
        clients: [],
        client: null,
        newClientForm: false,
        error: null
    }
    // API endpoint.
    api = '/api/v1/clients';

    componentDidMount() {
        Http.get(this.api)
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

    openNewClientForm = (e) => {
        e.preventDefault();
        this.setState({ newClientForm: true });
    }
    closeNewClientForm = (e) => {
        e.preventDefault();
        this.setState({ newClientForm: false });
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { client } = this.state;
        this.addClient(client);
    }
    addClient = (client) => {
        Http.post(this.api, { name: client, slug: client.replace(" ", "-").replace(".", "").toLowerCase() })
            .then(({ data }) => {
                const newItem = {
                    id: data.id,
                    name: client,
                    slug: client.replace(" ", "-").replace(".", "").toLowerCase(),
                };
                const allClients = [newItem, ...this.state.clients];
                this.setState({ clients: allClients, client: null, newClientForm: false });
                this.clientForm.reset();
            })
            .catch(() => {
                this.setState({
                    error: 'Sorry, there was an error saving the client.',
                });
            });
    }
    handleSetEditClient = (client) => {
        this.setState({ client: client });
    }
    handleClearEditClient = () => {
        this.setState({ client: null });
    }
    handleClientUpdate = (prop, e) => {
        const { client } = this.state;
        client[prop] = e.target.value;
        this.setState({ client: client });
    }
    handleSubmitClient = () => {
        const currentClient = this.state.client;
        Http.put(`/api/v1/clients/${currentClient.id}`, currentClient)
            .then(() => {
                const { clients } = this.state;
                let currentClientIndex = clients.findIndex(client => client.id === currentClient.id);
                clients[currentClientIndex] = currentClient;
                this.setState({ clients: clients });
            });
    }
    destroyClient = (client) => {
        const { id } = client;
        const { clients } = this.state;

        Http.delete(`${this.api}/${id}`)
            .then(() => {
                const updatedClients = clients.filter(client => client.id !== id);
                this.setState({ clients: updatedClients });
            })
            .catch(() => {
                this.setState({
                    error: 'Sorry, there was an error closing your to do.',
                });
            });
    }

    render() {
        const { clients } = this.state;
        return (
            <div className="pt-20 lg:pt-28 w-full">
                <div className="bg-white shadow-lg p-8 mt-8 mx-64 rounded-lg">
                    <div className="flex items-center mb-5">
                        <h1 className="font-display text-2xl font-bold">My Clients</h1>
                        <div className="ml-auto"><button className="bg-blue-400 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none" onClick={this.openNewClientForm}>Add a Client</button></div>
                    </div>
                    {this.state.newClientForm &&
                        <div className="flex items-center border-t border-gray-300 py-3 px-4 font-body">
                            <form className="flex items-center w-full" onSubmit={this.handleSubmit} ref={(el) => { this.clientForm = el; }}>
                                <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-2 -ml-2 block w-64 appearance-none leading-normal" type="text" name="client" onChange={this.handleChange} autoFocus />
                                <div className="ml-auto">
                                    <input className="text-sm text-white bg-blue-400 hover:bg-blue-700 rounded-lg py-1 px-2 cursor-pointer" type="submit" value="Save"/>
                                    <input className="text-sm text-blue-400 py-1 px-2 ml-1 hover:underline cursor-pointer" type="button" value="Cancel" onClick={this.closeNewClientForm}/>
                                </div>
                            </form>
                        </div>
                    }
                    {clients.map(client => (
                        <ClientItem client={client} key={client.id}
                            handleSetEditClient={this.handleSetEditClient}
                            handleClientUpdate={this.handleClientUpdate}
                            handleClearEditClient={this.handleClearEditClient}
                            handleSubmitClient={this.handleSubmitClient}
                            destroyClient={this.destroyClient} />
                    ))}
                </div>
            </div>
        );
    }
}

export default Clients;