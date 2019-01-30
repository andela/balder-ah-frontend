import React from 'react';
import PropTypes from 'prop-types';
import './Select.scss';

const Select = ({ input, children }) => (
  <select
    className="search-select"
    {...input}
  >
    {children}
  </select>
);

Select.defaultProps = {
  input: null,
};

Select.propTypes = {
  input: PropTypes.oneOfType([PropTypes.object]),
};

export default Select;
