import React from 'react';
import PropTypes from 'prop-types';
import './ReadTime.scss';

const ReadTime = ({ article }) => (
  <div>
    {article && (
      <div className="read-time">
        <i className="little material-icons" role="presentation">schedule</i>
        <p>
          {` ${article.readtime} `}
          read
        </p>
      </div>
    )}
  </div>
);


ReadTime.defaultProps = {
  article: {},
};

ReadTime.propTypes = {
  article: PropTypes.oneOfType([PropTypes.object]),
};

export default ReadTime;
