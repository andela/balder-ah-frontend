import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

import './AllUserArticles.scss';
import UserArticleCard from './UserArticleCard';
import { getUserArticles, deleteArticle } from '../../../actions/profile';
import PreLoader from '../../presentation/PreLoader';

class AllUserArticles extends Component {
  state = { fetching: false };

  async componentDidMount() {
    this.setState({ fetching: true });
    const { getUserArticles: getArticles } = this.props;
    await getArticles();
    this.setState({ fetching: false });
  }

  handleDeleteArticle = async (slug) => {
    const { deleteArticle: deleteOneArticle } = this.props;
    const confirmDelete = await swal({
      title: 'Are You Sure?',
      buttons: ['cancel', 'delete it'],
      icon: 'warning',
    });

    if (confirmDelete) await deleteOneArticle(slug);
  };

  render() {
    const { fetching } = this.state;
    const { articles } = this.props;
    return fetching ? <div className="fs-loader-container"><PreLoader /></div> : (
      <section className="user-articles-section container">
        {articles.length ? (
          <Fragment>
            <h2 className="user-articles-section__title">Published Articles</h2>
            <div>
              {articles.map(article => (
                <UserArticleCard
                  articleTitle={article.title}
                  articleSlug={article.slug}
                  key={article.slug}
                  deleteCallback={() => this.handleDeleteArticle(article.slug)}
                />
              ))}
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="no-articles">
              <h2 className="user-articles-section__title">No Articles Yet.</h2>
              <Link to="/create-article"><button type="button" className="btn">Write One</button></Link>
            </div>
          </Fragment>
        )}
      </section>
    );
  }
}

AllUserArticles.defaultProps = {
  articles: [],
};

AllUserArticles.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  getUserArticles: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
};

const mapStateToProps = ({ profile: { articles } }) => ({ articles });

export default connect(
  mapStateToProps,
  { getUserArticles, deleteArticle },
)(AllUserArticles);
