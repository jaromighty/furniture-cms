import React from 'react';
import { Route } from 'react-router-dom';

import Aux from '../../hoc/Aux/Aux';

const orders = (props) => (
    <Aux>
        {props.routes.map((route, index) => (
            <Route key={index} path={route.path} render={(props) => (
                <route.component {...props} />
            )} />
        ))}
    </Aux>
)

export default orders;