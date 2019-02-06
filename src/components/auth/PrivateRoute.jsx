import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PreLoader from '../presentation/PreLoader';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      switch (isLoggedIn) {
        case null:
          return (
            <div className="fs-loader-container">
              <PreLoader />
            </div>
          );
        case true:
          return <Component {...props} />;
        default:
          return <Redirect to="/login" />;
      }
    }}
  />
);

const mapStateToProps = ({ auth: { isLoggedIn = null } }) => ({ isLoggedIn });

export default connect(mapStateToProps)(PrivateRoute);
