/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import createUser from '../../actions/signup';
import DisplayMessage from '../presentation/DisplayMessage';
import SocialAuthButton from './SocialAuthButton';
import './Signup.scss';

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    message: false,
  };

  onChange = event => this.setState({ [event.target.name]: event.target.value });

  onKeyUpEvent = () => this.setState({ message: false });

  onSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    const signupData = {
      username,
      email,
      password,
    };

    const { createUser: signupUser } = this.props;
    await signupUser(signupData);

    const { message, history } = this.props;
    this.setState({ message });

    setTimeout(() => {
      typeof message === 'string' ? history.push('/') : '';
    }, 500);
  };

  comparePassword = () => {
    const { password, confirmPassword } = this.state;
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        return this.setState({ message: ['Passwords does not match!'] });
      }
      return this.setState({ message: false });
    }
    return false;
  };

  render() {
    const {
      message, username, email, password, confirmPassword,
    } = this.state;

    const { auth } = this.props;
    if (auth.isLoggedIn === null) return null;
    if (auth.isLoggedIn) return <Redirect to="/" />;
    return (
      <div className="signup-row">
        <div className="left-div" />

        <div className="form-area">
          <form className="signup-form" onSubmit={this.onSubmit}>
            <div className="form-header">
              <h2>Create your account</h2>
            </div>

            <DisplayMessage
              onSubmit={this.onSubmit}
              message={message}
              onKeyUp={this.comparePassword}
            />

            <div className="formInputs">
              <div className="form-field">
                <label htmlFor="username">
                  Username
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    onChange={this.onChange}
                    value={username}
                    onKeyUp={this.onKeyUpEvent}
                  />
                </label>
              </div>

              <div className="form-field">
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    onChange={this.onChange}
                    value={email}
                    onKeyUp={this.onKeyUpEvent}
                  />
                </label>
              </div>

              <div className="form-field">
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password should be alphanumeric e.g. abc123"
                    onChange={this.onChange}
                    value={password}
                    onKeyUp={this.comparePassword}
                  />
                </label>
              </div>

              <div className="form-field">
                <label htmlFor="confirmPassword">
                  Confirm Password
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Password should be alphanumeric e.g. abc123"
                    onChange={this.onChange}
                    value={confirmPassword}
                    onKeyUp={this.comparePassword}
                  />
                </label>
              </div>

              <div className="form-field">
                <button
                  disabled={this.comparePassword && message}
                  className="signupBtn"
                  type="submit"
                >
                  Sign up
                </button>
              </div>
            </div>
            <div className="social-media-container">
              <SocialAuthButton />
            </div>
            <div className="signup-alt">
              { 'Already have an account?' }
              <Link to="/login"> Login </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Signup.defaultProps = {
  auth: null,
};

Signup.propTypes = {
  createUser: PropTypes.func.isRequired,
  auth: PropTypes.oneOfType([PropTypes.object]),
};

const mapStateToProps = state => ({
  message: state.signup.response,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { createUser },
)(Signup);
