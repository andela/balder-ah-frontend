import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const socialAuthButton = ({
  href,
  fontAwsomIcon,
  socialMediaName,
  anchoreElementClassName,
}) => (
  <Fragment>
    <a className={`icon-link ${anchoreElementClassName}`} href={href}>
      <i className={`fab fa ${fontAwsomIcon}`} />
      {socialMediaName}
    </a>
  </Fragment>
);

socialAuthButton.propTypes = {
  href: PropTypes.string.isRequired,
  fontAwsomIcon: PropTypes.string.isRequired,
  socialMediaName: PropTypes.string.isRequired,
  anchoreElementClassName: PropTypes.string,
};
socialAuthButton.defaultProps = {
  anchoreElementClassName: '',
};


export default socialAuthButton;
