import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Login.scss';
import Input from '../presentation/Input';
import { login } from '../../actions/auth';
import Checkbox from '../presentation/Checkbox';
import SocialAuthButton from './SocialAuthButton';
import Button from '../presentation/Button';
import formValidator from '../../utils/formValidator';

const { _required, _email } = formValidator;
class Login extends Component {
  state = {
    error: null,
    redirectToReferrer: false,
  };

  onLogin = async (formValues) => {
    this.setState({ error: null });
    const { login: dispatchLogin } = this.props;

    const error = await dispatchLogin(formValues);

    return error
      ? this.setState({ error })
      : this.setState({ redirectToReferrer: true });
  };

  render() {
    const {
      handleSubmit, auth, location, submitting,
    } = this.props;
    const { error, redirectToReferrer } = this.state;

    const emailInput = 'email';
    const passwordInput = 'password';

    const { from } = location.state || { from: { pathname: '/' } };

    if (auth.isLoggedIn === null) return null;
    if (redirectToReferrer || auth.isLoggedIn) return <Redirect to={from} />;

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
              <p className={error && 'flash flash-danger'}>{error}</p>
            )}
            <Field
              name={emailInput}
              type={emailInput}
              id={emailInput}
              placeholder="you@example.com"
              label="Email"
              validate={[_required, _email]}
              className="input"
              component={Input}
            />
            <Field
              name={passwordInput}
              type={passwordInput}
              id={passwordInput}
              placeholder="*********"
              validate={[_required]}
              label="Password"
              className="input"
              component={Input}
            />
            <div className="input-group-flex">
              <Field label="Remember me" name="rememberMe" id="checkbox" component={Checkbox} />
              <Link to="/reset-password"><span className="link">Forgot password?</span></Link>
            </div>
            <div className="input-group">
              <Button disabled={submitting} type="submit" className="waves-effect waves-light btn btn-lg" title="Login" />
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
  handleSubmit: null,
  auth: {},
  location: {},
  submitting: false,
};

Login.propTypes = {
  handleSubmit: PropTypes.func,
  auth: PropTypes.oneOfType([PropTypes.any, PropTypes.object]),
  location: PropTypes.oneOfType([PropTypes.object]),
  submitting: PropTypes.bool,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { login },
)(reduxForm({ form: 'login' })(withRouter(Login)));
