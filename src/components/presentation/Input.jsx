import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  const {
    input, id, label, meta: { touched, error }, ...otherProps
  } = props;
  const hasError = touched && error;
  return (
    <div className="input-group">
      <label htmlFor={id}>
        {label}
        <input {...input} id={id} {...otherProps} />
        { hasError && <span className="error">{error}</span> }
      </label>
    </div>
  );
};

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
