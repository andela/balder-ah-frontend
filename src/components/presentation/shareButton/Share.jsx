import React from 'react';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  GooglePlusShareButton,
  GooglePlusIcon,
} from 'react-share';

class Share extends React.Component {
  state = {
    toggleShare: false,
  }

  onShare = () => {
    this.setState(prevState => ({
      toggleShare: !prevState.toggleShare,
    }));
  }

  render() {
    const { REACT_APP_URL } = process.env;
    const { articleSlug, articleTitle } = this.props;
    const url = `${REACT_APP_URL}/articles/${articleSlug}`;
    const title = articleTitle;
    const { toggleShare } = this.state;
    return (
      <React.Fragment>
        <div className="article-share">
          <i onClick={this.onShare} className="material-icons custom-article-share" role="presentation">share</i>
          <ul className={toggleShare ? ('icon-list-style-show') : ('icon-list-style-hidden')}>
            <li>
              <FacebookShareButton url={url}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </li>
            <li>
              <TwitterShareButton title={title} url={url}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </li>
            <li>
              <GooglePlusShareButton url={url}>
                <GooglePlusIcon size={32} round />
              </GooglePlusShareButton>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

Share.propTypes = {
  articleSlug: PropTypes.string.isRequired,
  articleTitle: PropTypes.string.isRequired,
};

export default Share;
