import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NavSearch.scss';

class NavSearch extends Component {
    state = {
      query: '',
    }

    onSearch = (e) => {
      e.preventDefault();

      const { query } = this.state;
      if (!query || !query.trim()) return;

      const { history } = this.props;
      history.push(`/search?q=${query}`);
    }

    handleQueryChange = (e) => {
      const { value: query } = e.target;
      this.setState({ query });
    }

    render() {
      const { query } = this.state;
      return (
        <form className="nav-search" onSubmit={this.onSearch}>
          <label className="nav-search-label" htmlFor="nav-search-input">
            <i className="material-icons">search</i>
            <input
              id="nav-search-input"
              placeholder="Search"
              className="nav-search-input"
              value={query}
              onChange={this.handleQueryChange}
              name="query"
              type="text"
            />
          </label>
        </form>
      );
    }
}

NavSearch.defaultProps = {
  history: null,
};

NavSearch.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]),
};

export default withRouter(NavSearch);
