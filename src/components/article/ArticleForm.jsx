import React from 'react';
import PropTypes from 'prop-types';

import uploadImage from '../../utils/imageUpload';
import Modal from '../presentation/Modal';
import './ArticleForm.scss';

class ArticleForm extends React.Component {
  constructor(props) {
    super(props);
    const {
      title,
      body,
      description,
      tags,
    } = this.props;

    this.state = {
      title: title || '',
      body: body || '',
      description: description || '',
      tagsInputValue: tags || '',
      tags: [],
      imgUrl: '',
      file: null,
      showModal: false,
      imgBtnShow: 'display-none',
      loading: 'https://i.imgur.com/ungt2Pg.gif',
      loadingShow: 'article-loading display-none',
      errorDisplay: '',
    };

    this.fileInput = React.createRef();
  }

  getSelectedImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({
        file: URL.createObjectURL(event.target.files[0]),
        imgBtnShow: 'btn display-block',
      });
    } else if (!file) {
      await this.setState({
        file: null,
        imgBtnShow: 'btn display-none',
      });
    }
  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  handleImgUpload = async () => {
    if (!this.fileInput.current.files[0]) {
      return this.setState({ imgUrl: '' });
    }
    const uploadResponse = await uploadImage(this.fileInput.current.files[0]);
    if (!uploadResponse || uploadResponse === 'Network Error') {
      return 'Upload Error';
    }
    return this.setState({ imgUrl: uploadResponse.data.secure_url });
  }

  postArticle = async (event) => {
    event.preventDefault();
    const { handleSubmit } = this.props;
    const { tagsInputValue, body } = this.state;

    const imgUploadResponse = await this.handleImgUpload();
    if (imgUploadResponse === 'Upload Error') {
      return this.setState({
        loadingShow: 'article-loading display-none',
        errorDisplay: 'Image upload failed',
      });
    }
    await this.setState({ description: body.substr(0, 50) });

    const newTagArray = tagsInputValue.split(',').map(tag => tag.trim());
    await this.setState({ tags: newTagArray });

    return handleSubmit(this.state);
  }

  checkType = async (event) => {
    event.persist();

    this.setState({ loadingShow: 'article-loading display-block' });

    const { actionType } = this.props;
    if (actionType === 'create') {
      this.postArticle(event);
    }
  }

  render() {
    const {
      title,
      body,
      tagsInputValue,
      file,
      showModal,
      imgBtnShow,
      loading,
      loadingShow,
      errorDisplay,
    } = this.state;

    const { btnValue } = this.props;

    return (
      <div>
        <Modal show={showModal} handleClose={this.hideModal}>
          <div className="container modal-img-container">
            <img src={file} alt="upload" />
          </div>
        </Modal>

        <form onSubmit={this.checkType} className="article-form">
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={e => this.setState({ title: e.target.value })}
              className="title textbox"
              required
              placeholder="Enter title of your article here"
            />
          </label>

          <label htmlFor="file-upload">
            Featured Image
            <input
              id="file-upload"
              type="file"
              name="file"
              className="inputfile"
              ref={this.fileInput}
              onChange={this.getSelectedImage}
              accept="image/*"
            />
          </label>

          <button
            type="button"
            id="show-image"
            className={imgBtnShow}
            onClick={this.showModal}
          >
            Show Image
          </button>
          <br />
          <label htmlFor="body">
            Body
            <textarea
              type="text"
              id="body"
              name="body"
              value={body}
              onChange={e => this.setState({ body: e.target.value })}
              className="textarea"
              required
              placeholder="Enter your article here"
            />
          </label>

          <label htmlFor="tag">
            Tags
            <input
              type="text"
              id="tag"
              name="tag"
              value={tagsInputValue}
              onChange={e => this.setState({ tagsInputValue: e.target.value })}
              className="textbox"
              required
              placeholder="Add your tags here (e.g tag1, tag2, tag3)"
            />
          </label>
          <div className="submit">
            <button type="submit" className="btn">
              {btnValue}
            </button>
            <img src={loading} alt="loading" className={loadingShow} />
            <p>{errorDisplay}</p>
          </div>
        </form>
      </div>
    );
  }
}

ArticleForm.defaultProps = {
  title: '',
  body: '',
  description: '',
  tags: '',
  btnValue: '',
};

ArticleForm.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.string,
  btnValue: PropTypes.string,
};

export default ArticleForm;
