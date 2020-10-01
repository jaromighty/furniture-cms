import React, { Component } from 'react';
import Http from '../Http';

import UserItem from '../components/Users/UserItem';

class Users extends Component {
    state = {
        users: [],
        user: null,
        clients: [],
    }

    api = '/api/v1';

    componentDidMount() {
        Http.get(`${this.api}/users`)
            .then(response => {
                const { data } = response.data;
                this.setState({
                    users: data,
                    error: false,
                });
            })
            .catch(() => {
                this.setState({
                    error: 'Unable to fetch data.',
                });
            });
        Http.get(`${this.api}/clients`)
            .then(response => {
                const { data } = response.data;
                this.setState({
                    clients: data,
                });
            })
            .catch(() => {
                this.setState({
                    error: 'Unable to fetch data.',
                });
            });
    }

    handleSetEditUser = (user) => {
        this.setState({ user: user });
    }
    handleClearEditUser = () => {
        this.setState({ user: null });
    }
    handleUserUpdate = (prop, e) => {
        const { user } = this.state;
        user[prop] = e.target.value;
        this.setState({ user: user });
    }
    handleSubmitUser = () => {
        const currentUser = this.state.user;
        Http.put(`/api/v1/users/${currentUser.id}`, currentUser)
            .then(response => {
                console.log(response.data);
                const { users } = this.state;
                let currentUserIndex = users.findIndex(user => user.id === currentUser.id);
                users[currentUserIndex] = response.data.user;
                this.setState({ users: users });
            });
    }
    destroyUser = (user) => {
        const { id } = user;
        const { users } = this.state;

        Http.delete(`${this.api}/users/${id}`)
            .then(() => {
                const updatedUsers = users.filter(user => user.id !== id);
                this.setState({ users: updatedUsers });
            })
            .catch(() => {
                this.setState({
                    error: 'Sorry, there was an error closing your to do.',
                });
            });
    }

    render() {
        const { users, clients } = this.state;
        return (
            <div className="pt-20 lg:pt-28 w-full">
                <div className="bg-white shadow-lg p-8 mt-8 mx-48 rounded-lg">
                    <div className="flex items-center mb-5">
                        <h1 className="font-display text-2xl font-bold">Administrators</h1>
                    </div>
                    {users.map(user => (
                        user.role === "admin" ?
                            <UserItem user={user} key={user.id}
                            handleSetEditUser={this.handleSetEditUser}
                            handleClearEditUser={this.handleClearEditUser}
                            handleSubmitUser={this.handleSubmitUser}
                            handleUserUpdate={this.handleUserUpdate}
                            destroyUser={this.destroyUser} /> : null
                    ))}
                </div>
                <div className="bg-white shadow-lg p-8 mt-8 mx-48 rounded-lg">
                    <div className="flex items-center mb-5">
                        <h1 className="font-display text-2xl font-bold">Designers</h1>
                    </div>
                    {users.map(user => (
                        user.role === "designer" ?
                            <UserItem user={user} key={user.id}
                                handleSetEditUser={this.handleSetEditUser}
                                handleClearEditUser={this.handleClearEditUser}
                                handleSubmitUser={this.handleSubmitUser}
                                handleUserUpdate={this.handleUserUpdate}
                                destroyUser={this.destroyUser}
                                clients={clients} /> : null
                    ))}
                </div>
            </div>
        );
    }
}

export default Users;
