import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import Button from '../presentation/Button';
import Input from '../presentation/Input';
import Select from '../presentation/Select';

const SearchForm = ({ handleSubmit, onSearch }) => (
  <div className="container">
    <form onSubmit={handleSubmit(onSearch)} className="search-form">
      <Field
        component={Input}
        name="query"
        type="text"
        id="query"
        required
        placeholder="Search"
        className="search"
      />
      <Field component={Select} name="searchBy">
        <option value="article">Article</option>
        <option value="tag">Tag</option>
        <option value="author">Author</option>
      </Field>
      <Button type="submit" className="btn" title="Search" />
    </form>
  </div>

);

SearchForm.defaultProps = {
  handleSubmit: null,
};

SearchForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSearch: PropTypes.func.isRequired,
};
export default reduxForm({ form: 'search' })(SearchForm);
