import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './EditProfileModal.scss';
import uploadImage from '../../utils/imageUpload';
import { updateProfile } from '../../actions/profile';

Modal.setAppElement(document.querySelector('#root'));
Modal.defaultStyles.overlay.backgroundColor = null;

/**
 * @class EditProfileModal
 * @description renders a modal on the profile page
 */
class EditProfileModal extends Component {
  /**
   * @constructor
   * @param {*} props react props
   */
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  state = {
    username: '',
    bio: '',
    email: '',
    image: '',
    uploading: false,
  };

  /**
   * @property
   * @description - responsible for uploading image & calling update profile action creator
   * @returns {void}
   */
  onProfileSave = async () => {
    await this.handleImageUpload();
    const {
      username,
      bio,
      image,
      email,
    } = this.state;

    const {
      updateProfile: updateUserProfile,
      onToggleModal,
      username: prevUsername,
      bio: prevBio,
      image: prevImage,
      email: prevEmail,
    } = this.props;

    updateUserProfile({
      username: username || prevUsername,
      bio: bio || prevBio,
      image: image || prevImage,
      email: email || prevEmail,
    });
    setTimeout(onToggleModal, 500);
  };

  /**
   * @property - responsible for handling input field changes
   * @returns {void}
   */
  onInputChange = e => (this.setState({ [e.target.id]: e.target.value }));

  /**
   * @property
   * @description - for getting image to be uploaded
   * @returns {void}
   */
  handleImageUpload = async () => {
    const { image } = this.props;

    if (!this.fileInput.current.files[0]) return this.setState({ image });
    this.setState({ uploading: true });
    const uploadResponse = await uploadImage(this.fileInput.current.files[0]);
    if (!uploadResponse) return this.setState({ image });
    this.setState({ uploading: false });
    return this.setState({ image: uploadResponse.data.secure_url });
  };

  /**
   * @method - render
   * @description renders the component
   * @returns {JSX} - modal content
   */
  render() {
    const {
      toggleModal,
      onToggleModal,
      username,
      bio,
      email,
    } = this.props;

    const { uploading } = this.state;

    return (
      <Modal
        isOpen={toggleModal}
        contentLabel="Edit Your Profile"
        onRequestClose={onToggleModal}
        closeTimeoutMS={250}
        className="edit-profile-modal"
        ariaHideApp={false}
      >
        <div className="modal-content container">
          <div className={`modal-overlay ${uploading ? 'is-uploading' : 'not-uploading'}`}>
            <img src="https://i.imgur.com/dlA6BeD.gif" alt="uploading" />
          </div>
          <h5 className="center-align">Edit Your Profile </h5>
          <div className="row">
            <form>
              <div className="row">
                <div className="col s12">
                  <label htmlFor="username">
                    <input
                      id="username"
                      type="text"
                      defaultValue={username}
                      onChange={this.onInputChange}
                    />
                    Username
                  </label>
                </div>
                <div className="col s12">
                  <label htmlFor="email">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={this.onInputChange}
                      disabled
                    />
                    Email
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <label htmlFor="bio">
                    <textarea
                      id="bio"
                      className="materialize-textarea profile-bio__edit"
                      defaultValue={bio}
                      onChange={this.onInputChange}
                    />
                    Bio
                  </label>
                </div>
              </div>
              <div className="row">
                <p><strong>Change profile photo:</strong></p>
                <br />
                <div>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    ref={this.fileInput}
                  />
                </div>
              </div>
            </form>
          </div>
          <button type="button" className="btn btn-large btn-lg" onClick={this.onProfileSave}>
            update profile
          </button>
        </div>
      </Modal>
    );
  }
}

EditProfileModal.propTypes = {
  username: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  toggleModal: PropTypes.bool.isRequired,
  onToggleModal: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  username: state.profile.username,
  bio: state.profile.bio,
  image: state.profile.image,
  email: state.profile.email,
});

export default connect(mapStateToProps, { updateProfile })(EditProfileModal);
