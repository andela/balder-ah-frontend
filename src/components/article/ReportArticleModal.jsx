import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import '../profile/EditProfileModal.scss';

Modal.setAppElement(document.querySelector('#root'));
Modal.defaultStyles.overlay.backgroundColor = null;

class ReportArticleModal extends Component {
  onReportClick = (e) => {
    e.preventDefault();
  };

  render() {
    const { toggleModal, onToggleModal } = this.props;
    return (
      <Modal
        isOpen={toggleModal}
        contentLabel="Report this article"
        onRequestClose={onToggleModal}
        closeTimeoutMS={250}
        className="edit-profile-modal"
        ariaHideApp={false}
      >
        <div className="modal-content container">
          <h3 className="center-align">Report This Article</h3>
          <form onSubmit={this.onReportClick}>
            <label htmlFor="spam">
              <input id="spam" className="with-gap" name="report-article" type="radio" />
              <span>Spam</span>
            </label>
            <label htmlFor="harrasment">
              <input id="harrasment" className="with-gap" name="report-article" type="radio" />
              <span>Harrasment</span>
            </label>
            <label htmlFor="rules-violation">
              <input id="rules-violation" className="with-gap" name="report-article" type="radio" />
              <span>Rules Violation</span>
            </label>
            <label htmlFor="terrorism">
              <input id="terrorism" className="with-gap" name="report-article" type="radio" />
              <span>Terrorism</span>
            </label>
            <input className="btn btn-lg" type="submit" value="Report" />
          </form>
        </div>
      </Modal>
    );
  }
}

ReportArticleModal.propTypes = {
  toggleModal: PropTypes.bool.isRequired,
  onToggleModal: PropTypes.func.isRequired,
};

export default ReportArticleModal;
