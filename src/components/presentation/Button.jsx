import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  type, title, handleClick, children, ...otherProps
}) => (
  <button type={type} onClick={handleClick} {...otherProps}>
    {title}
    { children }
  </button>
);

Button.defaultProps = {
  type: 'button',
  handleClick: () => {},
};
Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'button']),
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};
export default Button;
