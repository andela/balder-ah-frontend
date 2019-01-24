import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import QueryString from 'query-string';
import PropTypes from 'prop-types';
import updatePassword from '../../actions/updatepassword';
import './PasswordReset.scss';

class PasswordUpdateForm extends Component {
  state = {
    password: '',
    confirmNewPassword: '',
    error: '',
    errorStatus: false,
  };

  componentDidMount() {
    const { location } = this.props;
    const { token } = QueryString.parse(location.search);
    window.localStorage.setItem('updatepasswordToken', token);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { updatePassword: update } = this.props;
    const { password } = this.state;
    if (password) {
      if (password.length !== 8) {
        return this.setState({
          error: 'The passwords must be 8 characters',
        });
      }
      const isSuccessful = await update(this.state);
      if (isSuccessful) {
        const { history } = this.props;
        history.push('/login');
        return null;
      }
      return null;
    }
    return this.setState({
      error: 'Password fields can not be empty',
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleCompareInputs = (input) => {
    const { password } = this.state;
    if (input !== password) {
      return this.setState({ error: 'The passwords do not match', errorStatus: true });
    }
    return this.setState({ error: null, errorStatus: false });
  }

  render() {
    const {
      password,
      confirmNewPassword,
      error,
      errorStatus,
    } = this.state;
    return (
      <Fragment>
        <div className="container main-container">
          <div className="row">
            <div className="col s12 m8 l6 form-container">
              <form onSubmit={this.handleSubmit} className="s12 form">
                <div className="row">
                  <div className="col-s12 header-password-reset">
                    <h5>Reset password</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-s12 error-message">{error}</div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <label htmlFor="newPassword-disabled">
                      New password
                      <input
                        name="password"
                        id="newPassword-disabled"
                        type="password"
                        placeholder="Password should be alphanumeric e.g. abc123"
                        className="validate"
                        value={password}
                        onChange={this.handleInputChange}
                        required
                      />
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <label htmlFor="repeatPassword-disabled">
                      Confirm password
                      <input
                        name="confirmNewPassword"
                        id="repeatPassword-disabled"
                        type="password"
                        className="validate"
                        placeholder="Password should be alphanumeric e.g. abc123"
                        value={confirmNewPassword}
                        onKeyUp={() => this.handleCompareInputs(confirmNewPassword)}
                        onChange={this.handleInputChange}
                        required
                      />
                    </label>
                  </div>
                </div>
                <div className="row btn-container">
                  <div className="col s12">
                    <button
                      className="btn waves-effect waves-light btn-update"
                      type="submit"
                      name="action"
                      disabled={errorStatus}
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  updatePasswordResponse: state.updatePassword,
});

PasswordUpdateForm.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
  updatePassword: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { updatePassword },
)(PasswordUpdateForm);
