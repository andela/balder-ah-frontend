import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { parse as parseQuery } from 'query-string';
import './SearchResult.scss';
import SearchForm from './SearchForm';
import search from '../../actions/search';
import PreLoader from '../presentation/PreLoader';
import HorizontalArticleCard from '../presentation/HorizontalArticleCard';

class SearchResult extends Component {
  state = {
    searching: false,
    query: '',
  }

  async componentDidMount() {
    const { search: dispatchSearch, location } = this.props;
    const { q: query } = parseQuery(location.search);

    if (query) {
      this.setState({ query });
      await dispatchSearch({ query });
    }
  }

  handleSearch = async (values) => {
    const { query = '', searchBy: by = 'article' } = values;

    if (!query.trim()) return;
    this.setState({ searching: true });

    const { search: dispatchSearch } = this.props;

    await dispatchSearch({ query, by });
    this.setState({ query });
    this.setState({ searching: false });
  }

  render() {
    const { searching, query } = this.state;
    const { searchResults } = this.props;
    const foundResults = searchResults.results;
    return (
      <div className="container search-result">
        <SearchForm onSearch={this.handleSearch} />
        <div className="found">
          {query && (
          <h6>
            {`Found ${foundResults.length} result(s) for: `}
            <span className="query">{query}</span>
          </h6>
          )}
        </div>

        { searching && !foundResults.length && <PreLoader classes="abs-center" /> }
        { !searching && !foundResults.length
          ? <p className="title center">No results</p>
          : (
            <article className="results">
              {foundResults
                .map(result => (
                  <HorizontalArticleCard
                    key={result.slug}
                    article={result}
                  />))}
            </article>)
          }
      </div>
    );
  }
}

SearchResult.defaultProps = {
  searchResults: null,
  search: null,
  location: null,
};

SearchResult.propTypes = {
  searchResults: PropTypes.oneOfType([PropTypes.object]),
  search: PropTypes.func,
  location: PropTypes.oneOfType([
    PropTypes.object,
  ]),
};

const mapStateToProps = state => ({
  searchResults: state.search,
});

export default connect(mapStateToProps, { search })(SearchResult);
