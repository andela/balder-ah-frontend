import React from 'react';
import PropTypes from 'prop-types';

const PreLoader = ({ classes }) => {
  const classNames = `preloader-wrapper big active ${classes}`;
  return (
    <div className={classNames}>
      <div className="spinner-layer spinner-red">
        <div className="circle-clipper left">
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>
    </div>

  );
};

PreLoader.defaultProps = {
  classes: '',
};

PreLoader.propTypes = {
  classes: PropTypes.string,
};
export default PreLoader;
