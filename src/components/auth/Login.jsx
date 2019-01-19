import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Login.scss';
import Input from '../presentation/Input';
import login from '../../actions';
import Checkbox from '../presentation/Checkbox';
import SocialAuthButton from './SocialAuthButton';

class Login extends Component {
  state = {
    error: null,
  };

  onLogin = async (formValues) => {
    if (!formValues.email && !formValues.password) return null;
    const { login: dispatchLogin, history } = this.props;
    this.setState({ error: null });
    const error = await dispatchLogin(formValues);
    return error ? this.setState({ error }) : history.push('/');
  };

  render() {
    const { handleSubmit, auth } = this.props;
    const { error } = this.state;

    const emailInput = 'email';
    const passwordInput = 'password';

    return (
      <div className="login">
        <section className="login-form-container">
          <form onSubmit={handleSubmit(this.onLogin)} className="login-form">
            <div className="form-header">
              <h2>
                Welcome back
              </h2>
            </div>
            {error && auth && !auth.isLoggedIn && (
              <p className={error ? 'flash flash-danger' : 'none'}>{error}</p>
            )}
            <Field
              name={emailInput}
              type={emailInput}
              id={emailInput}
              required
              placeholder="you@example.com"
              label="Email"
              component={Input}
            />
            <Field
              name={passwordInput}
              type={passwordInput}
              id={passwordInput}
              placeholder="*********"
              required
              label="Password"
              component={Input}
            />
            <div className="input-group-flex">
              <Field label="Remember me" name="rememberMe" id="checkbox" component={Checkbox} />
              <span className="link">Forgot password?</span>
            </div>
            <div className="input-group">
              <button type="submit" className="btn btn-lg login-btn">
                Login
              </button>
            </div>
            <div className="social-media-container">
              <SocialAuthButton />
            </div>
            <div className="signup-alt">
              { 'Don\'t have an account?' }
              <Link to="/signup"> Signup </Link>
            </div>
          </form>
        </section>
        <section className="login-img" />
      </div>
    );
  }
}

Login.defaultProps = {
  handleSubmit: () => {},
  auth: {},
};

Login.propTypes = {
  handleSubmit: PropTypes.func,
  auth: PropTypes.oneOfType([PropTypes.any, PropTypes.object]),
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { login },
)(reduxForm({ form: 'login' })(Login));
