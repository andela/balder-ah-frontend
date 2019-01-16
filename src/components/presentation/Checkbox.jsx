import React from 'react';

const Checkbox = ({ input, id, label }) => (
  <div className="input-checkbox">
    <label htmlFor={id}>
      <input type="checkbox" {...input} id={id} />
      <span className="input-checkbox-label">{label}</span>
    </label>
  </div>
);

export default Checkbox;
