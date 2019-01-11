import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import ProptTypes from 'prop-types';
import './Login.css';
import Input from '../../presentation/Input';
import { login } from '../../../actions';
import Checkbox from '../../presentation/Checkbox';

class Login extends Component {
  state = {
    error: null,
  };

  onLogin = async (formValues) => {
    const { login: dispatchLogin } = this.props;
    this.setState({ error: null });
    const error = await dispatchLogin(formValues);
    if (error) {
      this.setState({ error });
    }
  };

  render() {
    const { handleSubmit, auth } = this.props;
    const { error } = this.state;

    const emailInput = 'email';
    const passwordInput = 'password';

    return (
      <div className="login">
        <section className="login__form-container">
          <form onSubmit={handleSubmit(this.onLogin)} className="login__form">
            <h1 className="login__form-title">Welcome back</h1>
            {!error && auth && auth.isLoggedIn ? (
              <p className="alert alert-success">{auth.message}</p>
            ) : (
              <p className={error ? 'alert alert-danger' : 'none'}>{error}</p>
            )}
            <Field
              name={emailInput}
              type={emailInput}
              id={emailInput}
              placeholder="you@example.com"
              label="Email"
              component={Input}
            />
            <Field
              name={passwordInput}
              type={passwordInput}
              id={passwordInput}
              placeholder="*********"
              label="Password"
              component={Input}
            />
            <div className="input-group__flex">
              <Field label="Remember me" name="rememberme" id="checkbox" component={Checkbox} />
              <span className="link">Forgot password?</span>
            </div>
            <div className="input-group">
              <button type="submit" className="btn">
                Login
              </button>
            </div>
          </form>
        </section>
        <section className="login__img" />
      </div>
    );
  }
}

Login.defaultProps = {
  handleSubmit: () => {},
  auth: {},
};

Login.propTypes = {
  handleSubmit: ProptTypes.func,
  auth: ProptTypes.oneOfType([ProptTypes.any, ProptTypes.object]),
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { login },
)(reduxForm({ form: 'login' })(Login));
