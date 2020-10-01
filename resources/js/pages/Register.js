import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ReeValidate from 'ree-validate';
import classNames from 'classnames';
import AuthService from '../services';

class Register extends Component {
  constructor() {
    super();

    this.validator = new ReeValidate({
      name: 'required|min:3',
      email: 'required|email',
      password: 'required|min:6',
      password_confirmation: 'required|min:6',
    });

    this.state = {
      loading: false,
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: {},
      response: {
        error: false,
        message: '',
      },
      success: false,
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
    const validation = this.validator.errors;

    // Avoid validation until input has a value.
    if (value === '') {
      return;
    }

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
    const {
      name, email, password, password_confirmation,
    } = this.state;
    const credentials = {
      name,
      email,
      password,
      password_confirmation,
    };

    // Set response state back to default.
    this.setState({ response: { error: false, message: '' } });

    this.validator.validateAll(credentials)
      .then((success) => {
        if (success) {
          this.setState({ loading: true });
          this.submit(credentials);
        }
      });
  }

  submit(credentials) {
    this.props.dispatch(AuthService.register(credentials))
      .then(() => {
        this.registrationForm.reset();
        this.setState({ loading: false, success: true });
      })
      .catch((err) => {
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
    // If user is already authenticated we redirect to dashboard.
    if (this.props.isAuthenticated) {
      return <Redirect to="/" replace />;
    }

    const { response, errors, loading } = this.state;

    return (
      <div>
        <div className="flex flex-col flex-md-row md:items-center py-8">
          <div className="w-10/12 px-6">
            <div className="flex flex-wrap">
              <div className="w-2/5 mx-auto">

                <h4 className="text-2xl text-center font-medium mb-4">Register for the App</h4>

                <div className="relative flex flex-col bg-white shadow-xl rounded-lg mt-12 mb-8">
                  <div className="flex-auto p-12">

                    {response.error &&
                    <div className="alert alert-danger text-center" role="alert">
                      { response.message }
                    </div>
                    }

                    {this.state.success &&
                    <div className="alert alert-success text-center" role="alert">
                      Registration successful.<br />
                      <Link className="inline-block pt-2 text-blue-400 no-underline hover:underline" to="/" href="/">Please log in with your new email and password.</Link>

                    </div>
                    }

                    {!this.state.success &&
                    <form method="POST" onSubmit={this.handleSubmit} ref={(el) => { this.registrationForm = el; }}>

                      <div className="mb-4">
                        <label className="inline-block mb-2" htmlFor="name">Name</label>
                        <input
                          id="name"
                          type="name"
                          name="name"
                          className={classNames('block w-full py-1 px-3 text-base leading-normal font-normal text-gray-700 bg-white border border-gray-400 rounded', {
                            'is-invalid': ('name' in errors),
                          })}
                          placeholder="Enter name"
                          required
                          onChange={this.handleChange}
                          onBlur={this.handleBlur}
                          disabled={loading}
                        />

                        {('name' in errors) &&
                        <div className="invalid-feedback">{ errors.name }</div>
                        }
                      </div>

                      <div className="mb-4">
                        <label className="inline-block mb-2" htmlFor="email">Email Address</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          className={classNames('block w-full py-1 px-3 text-base leading-normal font-normal text-gray-700 bg-white border border-gray-400 rounded', {
                            'is-invalid': ('email' in errors),
                          })}
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

                      <div className="mb-4">
                        <label className="inline-block mb-2" htmlFor="password">Password</label>
                        <input
                          id="password"
                          type="password"
                          className={classNames('block w-full py-1 px-3 text-base leading-normal font-normal text-gray-700 bg-white border border-gray-400 rounded', {
                            'is-invalid': ('password' in errors),
                          })}
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

                      <div className="mb-6">
                        <label className="inline-block mb-2" htmlFor="password_confirmation">Password Confirmation</label>
                        <input
                          id="password_confirmation"
                          type="password"
                          className={classNames('block w-full py-1 px-3 text-base leading-normal font-normal text-gray-700 bg-white border border-gray-400 rounded', {
                            'is-invalid': ('password_confirmation' in errors),
                          })}
                          name="password_confirmation"
                          placeholder="Confirm password"
                          required
                          onChange={this.handleChange}
                          onBlur={this.handleBlur}
                          disabled={loading}
                        />
                        {('password_confirmation' in errors) &&
                        <div className="invalid-feedback">{ errors.password_confirmation }</div>
                        }
                      </div>

                      <div className="text-center">
                        <button
                          type="submit"
                          className={classNames('inline-block w-full rounded-full bg-blue-400 hover:bg-blue-700 border border-blue-400 hover:border-blue-700 text-white text-base align-middle py-2 px-3 leading-normal', {
                            'btn-loading': loading,
                          })}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                    }

                  </div>
                </div>

                {!this.state.success &&
                <div className="text-sm text-center">{'Already registered?'} <Link className="text-blue-400 no-underline hover:underline" to="/" href="/">Log in</Link>.</div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Register);
