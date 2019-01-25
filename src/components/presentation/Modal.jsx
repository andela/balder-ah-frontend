import React from 'react';
import PropTypes from 'prop-types';

import './modal.scss';

const Modal = ({ handleClose, show, children }) => (
  <div className={show ? 'img-modal display-block' : 'img-modal display-none'}>
    <section className="modal-main">
      {children}
      <button type="button" className="modal-btn" onClick={handleClose}>close</button>
    </section>
  </div>
);

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
