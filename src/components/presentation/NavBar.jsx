import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newNotification } from '../../actions/notifications';
import './navbar.scss';
import NavSearch from './NavSearch';

class NavBar extends Component {
  state = {
    showNotif: false,
  }

  showNotifications = () => {
    const { showNotif } = this.state;
    if (showNotif === false) {
      this.setState({ showNotif: true });
      return false;
    }
    this.setState({ showNotif: false });
    return false;
  }

  clearNotifications = () => {
    localStorage.removeItem('newNotification');
    const { dispatchNewNotifications } = this.props;
    dispatchNewNotifications([]);
  }

  render() {
    const { showNotif } = this.state;
    const { location: { pathname }, notifications } = this.props;
    const { newNotification: allNotifications } = notifications;
    return (
      <nav className="nav">
        <div className="navbar">
          <div className="brand">
            <Link to="/">Authors Haven</Link>
          </div>
          <div className="nav-links">
            <ul id="nav-mobile" className="">
              { pathname !== '/search' && (
                <li>
                  <NavSearch />
                </li>)
                }
              <li>
                <i
                  className="material-icons small icon notif-bell"
                  role="presentation"
                  onClick={this.showNotifications}
                >
                  add_alert
                </i>
                <span
                  className="notif-count"
                  role="presentation"
                  onClick={this.showNotifications}
                >
                  {
                    !allNotifications.length ? '' : allNotifications.length
                  }
                </span>
                <div className={allNotifications.length && showNotif === true ? 'notif-bar' : 'display-none'}>
                  {
                    allNotifications.length
                    && allNotifications.map((notif, index) => (
                      <div key={`${Math.random() * index}`} className="notif">
                        { notif }
                        <hr />
                      </div>
                    ))
                  }
                  <Link
                    to="/notifications"
                    className="center btn small"
                    onClick={this.clearNotifications}
                  >
                    View details
                  </Link>
                </div>
              </li>
              <li>
                <Link to="/articles">Articles</Link>
              </li>
              <li>
                <Link to="/create-article">
                  Create article
                </Link>
              </li>
              <li>
                <i className="small icon material-icons">
                  menu
                </i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

NavBar.defaultProps = {
  location: null,
  notifications: [],
  dispatchNewNotifications: [],
};

NavBar.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.object,
  ]),
  notifications: PropTypes.oneOfType([
    PropTypes.object,
  ]),
  dispatchNewNotifications: PropTypes.oneOfType([
    PropTypes.object,
  ]),
};

const mapStateToProps = ({ notifications }) => (
  { notifications }
);

export default connect(
  mapStateToProps,
  { dispatchNewNotifications: newNotification },
)(withRouter(NavBar));
