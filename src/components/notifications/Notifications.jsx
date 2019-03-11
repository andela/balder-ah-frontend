import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getNotifications from '../../actions/notifications';
import './Notifications.scss';

class GetNotifications extends Component {
  componentDidMount = async () => {
    const { getNotifications: allNotifications } = this.props;
    await allNotifications();
  }

  render() {
    const { notifications } = this.props;
    return (
      <div className="notifications row z-depth-2">
        <div className="notif-header center red">
          Notifications
          <i className="material-icons">
            add_alert
          </i>
        </div>
        {
          notifications.reverse().map((notif) => {
            const date = new Date(notif.createdAt).toLocaleString();
            return (
              <div key={notif.createdAt}>
                <div className="notif-body">
                  <div className="notif-message">
                    {
                      notif.message
                    }
                  </div>
                  <div className="notif-date">
                    {
                      date
                    }
                  </div>
                </div>
                <hr />
              </div>
            );
          })
        }
      </div>
    );
  }
}

GetNotifications.defaultProps = {
  notifications: [],
};

GetNotifications.propTypes = {
  getNotifications: PropTypes.func.isRequired,
  notifications: PropTypes.oneOfType([PropTypes.array]),
};

const mapStateToProps = ({ auth: { isLoggedIn }, notifications: { notifications } }) => ({
  notifications,
  isLoggedIn,
});

export default connect(mapStateToProps, { getNotifications })(GetNotifications);
