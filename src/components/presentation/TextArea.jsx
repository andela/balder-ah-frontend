import React from 'react';

const TextArea = (props) => {
  const {
    id, input, ...otherProps
  } = props;
  return (
    <label htmlFor={id}>
      <textarea id={id} {...input} {...otherProps} />
    </label>
  );
};

export default TextArea;
