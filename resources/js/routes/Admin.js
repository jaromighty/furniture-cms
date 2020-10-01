import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import Base from '../Base';

const AdminRoute = ({ component: Component, isAuthenticated, isAdmin, user, routes, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            isAuthenticated && isAdmin ? (
                <Base isAuthenticated={isAuthenticated}>
                    <Component {...props} routes={routes} />
                </Base>
            ) : (
                <Redirect to={{
                        pathname: '/',
                        state: { from: props.location },
                    }}
                />
            )
        )}
    />
);

AdminRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    // isAdmin: PropTypes.bool.isRequired,
};

const MapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    isAdmin: state.Auth.user.role === "admin" ? true : false,
    user: state.Auth.user,
});

export default connect(MapStateToProps)(AdminRoute);
