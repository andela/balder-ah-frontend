import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { getArticles } from '../../actions/articles';
import ArticleCard from '../presentation/ArticleCard';
import './AllArticles.scss';
import PreLoader from '../presentation/PreLoader';

class AllArticles extends Component {
  state = {
    isFetching: true,
  };

  async componentDidMount() {
    const { getArticles: getAll } = this.props;
    await getAll();
    this.setState({ isFetching: false });
  }

  handleClick = async (data) => {
    this.setState({ isFetching: true });
    const { selected: selectedPageNumber } = data;
    const { getArticles: getAll } = this.props;
    await getAll(selectedPageNumber + 1);
    this.setState({ isFetching: false });
  };

  renderArticles() {
    const { allArticles } = this.props;
    const { isFetching } = this.state;

    if (!isFetching) {
      return allArticles.data.map(article => <ArticleCard key={article.id} article={article} />);
    }
    return <PreLoader />;
  }

  render() {
    const {
      allArticles: { pageCount },
    } = this.props;
    return (
      <div className="all-article">
        <div className="row">
          <div className="col s12">
            <h6 className="trending-tags">Trending tags goes here</h6>
          </div>
        </div>

        <div className="row feature">
          <div className="col s12 feature-image">
            <h1 className="feature-text">
              <p>
                The more that you read, the more things you will know.
                The more you learn, the more places you will go - Dr. Suess
              </p>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m4">
            <div className="card">Trending Articles goes here</div>
          </div>
          <div className="col s12 m8 all-articles">{this.renderArticles()}</div>
        </div>

        <div className="article-pagination">
          <ReactPaginate
            className="btn btn-md"
            previousLabel="previous"
            nextLabel="next"
            breakLabel="..."
            breakClassName="break-me"
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={this.handleClick}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        </div>
      </div>
    );
  }
}

AllArticles.defaultProps = {
  allArticles: [],
};

const mapStateToProps = state => ({
  allArticles: state.article.all,
  message: state.article.message,
});

AllArticles.propTypes = {
  allArticles: PropTypes.oneOfType([PropTypes.any, PropTypes.object]),
};
export default connect(
  mapStateToProps,
  { getArticles },
)(AllArticles);
