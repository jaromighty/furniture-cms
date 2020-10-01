import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import * as actions from '../store/actions';

class Header extends Component {

  state = {
    open: false
  }
  handleLogout = (e) => {
    e.preventDefault();
    this.props.dispatch(actions.authLogout());
    this.setState({open: false});
  }
  handleDropdown = (e) => {
    e.preventDefault;
    this.setState(prevState => ({
      open: !prevState.open
    }));
  }

  render() {
    return (
      <header className="flex bg-white border-b border-gray-200 fixed top-0 inset-x-0 z-100 h-16 items-center shadow">
        <div className="w-full max-w-screen-xl relative mx-auto px-6">
          <div className="flex items-center -mx-6">
            <div className="px-6 lg:pr-8">
              <div className="flex items-center">
                <h1 className="my-0 font-normal text-xl md:py-4 md:px-6">
                  <Link className="block lg:mr-4" to="/">Furniture CMS</Link>
                </h1>
              </div>
            </div>
            {this.props.isAuthenticated &&
            <div className="ml-auto md:py-3 md:px-6">
              <ul className="flex flex-wrap pl-0 mb-0 list-none">
                <li className="relative">
                  <a className="block py-2 px-4 whitespace-no-wrap text-blue-400 hover:text-blue-500 no-underline cursor-pointer" onClick={this.handleDropdown}>
                    {this.props.user.name}
                    <svg className="inline-block h-4 w-4 stroke-current fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </a>
                  {this.state.open &&
                  <div className="absolute right-0 left-auto z-100 min-w-40 bg-white float-left py-2 mt-1 text-left list-none border border-gray-400 rounded">
                    <Link to="/" className="block w-full py-1 px-6 whitespace-no-wrap hover:bg-gray-100">
                      Settings
                    </Link>
                    <div className="h-0 my-2 overflow-hidden border-t border-gray-300"></div>
                    <a className="block w-full py-1 px-6 whitespace-no-wrap hover:bg-gray-100 cursor-pointer" onClick={this.handleLogout}>
                      Log Out
                    </a>
                  </div>}
                </li>
              </ul>
            </div>}
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps)(Header);
