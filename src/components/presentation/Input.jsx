import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type, id, label, placeholder, input,
}) => (
  <div className="input-group">
    <label htmlFor={id}>
      {label}
      <input {...input} id={id} type={type} placeholder={placeholder} />
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
