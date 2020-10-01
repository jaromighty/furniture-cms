import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ReeValidate from 'ree-validate';
import classNames from 'classnames';
import AuthService from '../services';

class Home extends Component {
  constructor() {
    super();

    this.validator = new ReeValidate({
      email: 'required|email',
      password: 'required|min:6',
    });

    this.state = {
      loading: false,
      email: '',
      password: '',
      errors: {},
      response: {
        error: false,
        message: '',
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    // If a field has a validation error, we'll clear it when corrected.
    const { errors } = this.state;
    if (name in errors) {
      const validation = this.validator.errors;
      this.validator.validate(name, value).then(() => {
        if (!validation.has(name)) {
          delete errors[name];
          this.setState({ errors });
        }
      });
    }
  }

  handleBlur = (e) => {
    const { name, value } = e.target;

    // Avoid validation until input has a value.
    if (value === '') {
      return;
    }

    const validation = this.validator.errors;
    this.validator.validate(name, value).then(() => {
      if (validation.has(name)) {
        const { errors } = this.state;
        errors[name] = validation.first(name);
        this.setState({ errors });
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const credentials = {
      email,
      password,
    };

    this.validator.validateAll(credentials)
      .then((success) => {
        if (success) {
          this.setState({ loading: true });
          this.submit(credentials);
        }
      });
  }

  submit = (credentials) => {
    this.props.dispatch(AuthService.login(credentials))
      .catch((err) => {
        this.loginForm.reset();
        const errors = Object.values(err.errors);
        errors.join(' ');
        const response = {
          error: true,
          message: errors,
        };
        this.setState({ response });
        this.setState({ loading: false });
      });
  }

  render() {
    // If user is already authenticated we redirect to entry location.
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return (
        <Redirect to={from} />
      );
    }

    const { response, errors, loading } = this.state;

    return (
      <div>
        <div className="flex flex-col flex-md-row md:items-center py-8">
          <div className="w-10/12 px-6">
            <div className="flex flex-wrap">
              <div className="flex justify-center items-center px-8 mb-4 md:mb-0 lg:w-1/2">
                <div>
                  <h2 className="text-3xl font-medium leading-tight mb-2">Order Management Web App</h2>
                  <p className="mb-4">Built with Laravel and React. Includes JWT auth, registration, login, routing and tests. <a href="https://wptheming.com/2019/02/building-a-react-app-on-laravel/">Learn more</a>.</p>
                  <p className="mb-4"><a href="https://github.com/devinsays/laravel-react-bootstrap">Source code and documentation on GitHub.</a></p>
                </div>
              </div>
              <div className="lg:w-1/2 px-8">
                <h4 className="text-2xl text-center font-medium mb-4">Log in to the App</h4>

                <div className="relative flex flex-col bg-white border border-gray-400 rounded mb-6">
                  <div className="flex-auto p-12">

                    <form method="POST" onSubmit={this.handleSubmit} ref={(el) => { this.loginForm = el; }}>

                      {response.error &&
                      <div className="alert alert-danger" role="alert">
                        Credentials were incorrect. Try again!
                      </div>
                      }

                      <div className="mb-4">
                        <label className="inline-block mb-2" htmlFor="email">Email Address</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          className={classNames('block w-full py-1 px-3 text-base leading-normal font-normal text-gray-700 bg-white border border-gray-400 rounded', {
                              'is-invalid': ('email' in errors),
                            })
                          }
                          placeholder="Enter email"
                          required
                          onChange={this.handleChange}
                          onBlur={this.handleBlur}
                          disabled={loading}
                        />

                        {('email' in errors) &&
                        <div className="invalid-feedback">{ errors.email }</div>
                        }
                      </div>

                      <div className="mb-6">
                        <label className="inline-block mb-2" htmlFor="password">Password</label>
                        <input
                          id="password"
                          type="password"
                          className={classNames('block w-full py-1 px-3 text-base leading-normal font-normal text-gray-700 bg-white border border-gray-400 rounded', {
                              'is-invalid': ('password' in errors),
                            })
                          }
                          name="password"
                          placeholder="Enter password"
                          required
                          onChange={this.handleChange}
                          onBlur={this.handleBlur}
                          disabled={loading}
                        />
                        {('password' in errors) &&
                        <div className="invalid-feedback">{ errors.password }</div>
                        }
                      </div>

                      <div className="mb-4 text-center">
                        <button
                          type="submit"
                          className={classNames('inline-block w-full rounded-full bg-blue-400 hover:bg-blue-700 border border-blue-400 hover:border-blue-700 text-white text-base align-middle py-2 px-3 leading-normal', {
                            'btn-loading': loading,
                          })}
                        >
                          Sign In
                        </button>
                      </div>

                      <div className="text-sm text-center">{'Don\'t have an account?'} <Link className="text-blue-400 no-underline hover:underline" to="/register">Register</Link>.</div>
                    </form>
                  </div>
                </div>

                <div className="text-sm text-center">
                  <Link className="text-blue-400 no-underline hover:underline" to="/forgot-password">
                    Forgot Your Password?
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
