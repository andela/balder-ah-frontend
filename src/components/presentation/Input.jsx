import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  input, id, label, ...otherProps
}) => (
  <div className="input-group">
    <label htmlFor={id}>
      {label}
      <input {...input} id={id} {...otherProps} />
    </label>
  </div>
);

Input.defaultProps = {
  placeholder: '',
  input: {},
};
Input.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  input: PropTypes.oneOfType([PropTypes.object]),
};

export default Input;
