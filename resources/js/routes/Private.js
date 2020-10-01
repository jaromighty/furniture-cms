import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import Base from '../Base';

const PrivateRoute = ({ component: Component, isAuthenticated, routes, ...rest }) => (
  <Route
    {...rest}
    render={props => (
        isAuthenticated ? (
          <Base isAuthenticated={isAuthenticated}>
            <Component {...props} routes={routes} />
          </Base>
        ) : (
          <Redirect to={{
                pathname: '/login',
                state: { from: props.location },
            }}
          />
        )
    )}
  />
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
