import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Clients from '../pages/Clients';
import Users from '../pages/Users';
import Archive from '../pages/Archive';
import NoMatch from '../pages/NoMatch';
import Products from '../pages/Products';
import Orders from '../components/Orders/Orders';
import OrderList from '../components/Orders/OrderList';

const routes = [
  {
    path: '/',
    exact: true,
    auth: true,
    component: Dashboard,
    admin: false,
  },
  {
    path: '/orders',
    auth: true,
    component: Orders,
    admin: true,
    routes: [
      {
        path: '/orders/:slug',
        auth: true,
        component: OrderList
      }
    ],
  },
  {
    path: '/login',
    exact: true,
    auth: false,
    admin: false,
    component: Login,
  },
  {
    path: '/register',
    exact: true,
    auth: false,
    admin: false,
    component: Register,
  },
  {
    path: '/forgot-password',
    exact: true,
    auth: false,
    admin: false,
    component: ForgotPassword,
  },
  {
    path: '/reset-password',
    exact: true,
    auth: false,
    admin: false,
    component: ResetPassword,
  },
  {
    path: '/clients',
    exact: true,
    auth: true,
    component: Clients,
    admin: true,
  },
  {
    path: '/products',
    exact: true,
    auth: true,
    component: Products,
    admin: true,
  },
  {
    path: '/users',
    exact: true,
    auth: true,
    component: Users,
    admin: true,
  },
  {
    path: '/archive',
    exact: true,
    auth: true,
    component: Archive,
    admin: true,
  },
  {
    path: '',
    exact: false,
    auth: false,
    admin: false,
    component: NoMatch,
  },
];

export default routes;
