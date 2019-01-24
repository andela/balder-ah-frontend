import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import QueryString from 'query-string';
import PropTypes from 'prop-types';
import socialAuth from '../../actions/socialAuth';

export class SocialMediaLogin extends Component {
  componentDidMount() {
    const { socialAuth: socialAuthentication, history, location } = this.props;
    const { token } = QueryString.parse(location.search);
    socialAuthentication(token);
    history.push('/');
  }

  render() {
    return <Fragment />;
  }
}

SocialMediaLogin.propTypes = {
  socialAuth: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, { socialAuth })(SocialMediaLogin);
