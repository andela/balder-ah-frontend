import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import '../../../assets/sass/base.scss';

const ToggleNotification = ({ emailNotificationStatus, onChange, name }) => (
  <Fragment>
    <div className="switch switch-style">
      <h6 className="email-settings">Email Notification</h6>
      <label htmlFor="opt">
        Off
        <input id="opt" name={name} checked={emailNotificationStatus} type="checkbox" onChange={onChange} />
        <span className="lever" />
        On
      </label>
    </div>
  </Fragment>
);

ToggleNotification.propTypes = {
  emailNotificationStatus: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default ToggleNotification;
