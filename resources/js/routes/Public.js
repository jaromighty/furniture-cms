import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import Base from '../Base';

const PublicRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Base isAuthenticated={isAuthenticated}>
        <Component {...props} />
      </Base>
    )}
  />
);

PublicRoute.propTypes = {
};

export default PublicRoute;
