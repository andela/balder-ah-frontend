import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Home.scss';
import TrendingArticles from './presentation/TrendingArticles';
import LatestArticles from './presentation/LatestArticles';
import { getArticles } from '../actions/articles';
import PreLoader from './presentation/PreLoader';
import FeaturedArticles from './presentation/FeaturedArticles';

class Home extends Component {
  state = {
    loading: true,
  }

  async componentDidMount() {
    const { getArticles: fetchArticles } = this.props;
    await fetchArticles();
    this.setState({ loading: false });
  }

  render() {
    const { articles } = this.props;
    const { loading } = this.state;
    const trending = articles.slice(0, 5);
    const featured = articles.slice(5, 7);
    const latest = articles.slice(7, 10);

    return (
      <main className="main container">
        { loading
          ? <PreLoader classes="abs-center middle" />
          : (
            <Fragment>
              <TrendingArticles articles={trending} />
              <FeaturedArticles articles={featured} />
              <LatestArticles articles={latest} />
            </Fragment>
          )}

      </main>
    );
  }
}

Home.defaultProps = {
  articles: [],
};

Home.propTypes = {
  articles: PropTypes.oneOfType([
    PropTypes.array,
  ]),
};

const mapStateToProps = ({ article }) => ({ articles: article.all.data });

export default connect(mapStateToProps, { getArticles })(Home);
