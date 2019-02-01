import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import resetPassword from '../../actions/resetPassword';
import './PasswordReset.scss';

export class PasswordResetForm extends Component {
  state = {
    email: '',
    submitStatus: false,
  };

  handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const { resetPassword: reset } = this.props;
      await reset(this.state);
      return null;
    } catch (error) {
      return null;
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { email } = this.state;
    return (
      <Fragment>
        <div className="container main-container">
          <div className="row form-sub-container">
            <div className="col s12 m8 l6 form-container">
              <form onSubmit={this.handleSubmit} className="s12 form">
                <div className="row">
                  <div className="col-s12 header-password-reset">
                    <h5>Recover password</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <label htmlFor="email-disabled">
                      Email
                      <input
                        name="email"
                        onChange={this.handleInputChange}
                        id="email-disabled"
                        type="Email"
                        placeholder="Enter email"
                        className="validate"
                        value={email}
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
                    >
                      Reset Password
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
  resetDetails: state.auth,
});
PasswordResetForm.propTypes = {
  resetPassword: PropTypes.func.isRequired,
};
export default connect(
  mapStateToProps,
  { resetPassword },
)(PasswordResetForm);
