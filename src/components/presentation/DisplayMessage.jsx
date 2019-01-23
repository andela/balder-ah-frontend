import React from 'react';
import '../../assets/sass/input/_display-message.scss';

const DisplayMessage = props => props.message && (
  <div>
    {
      props.onSubmit
      && (
      <div className={typeof props.message === 'string' ? 'message-box' : 'error-box'}>
        <div className="alert">
          {typeof props.message === 'string' ? props.message
            : props.message.map(error => <li key={error}>{error}</li>)}
        </div>
      </div>
      )
    }
  </div>
);

export default DisplayMessage;
