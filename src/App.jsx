import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Pusher from 'pusher-js';
import toastr from 'toastr';
import { getLoggedInUser } from './actions/auth';
import Home from './components/Home';
import { newNotification } from './actions/notifications';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import CreateArticle from './components/article/CreateArticle';
import ViewArticle from './components/article/ViewArticle';
import AllArticles from './components/article/AllArticles';
import ProfilePage from './components/profile/Profile';
import SocialLogin from './components/auth/SocialMediaLogin';
import PasswordReset from './components/auth/PasswordReset';
import UpdatePassword from './components/auth/UpdatePassword';
import FollowAuthor from './components/profile/FollowAuthor';
import NavBar from './components/presentation/NavBar';
import Footer from './components/presentation/Footer';
import NotFoundPage from './components/404/NotFoundPage';
import SearchResult from './components/search/SearchResult';
import AllUserArticles from './components/profile/articles/AllUserArticles';
import PrivateRoute from './components/auth/PrivateRoute';
import GetNotifications from './components/notifications/Notifications';

class App extends Component {
  async componentDidMount() {
    const { getLoggedInUser: getUser, newNotification: dispatchNewNotfication } = this.props;
    await getUser();

    const notifications = JSON.parse(localStorage.getItem('newNotification'));
    dispatchNewNotfication(notifications || []);

    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: 'us2',
      encrypted: true,
    });

    const channel = pusher.subscribe('balderah-notifications');
    const { user } = this.props;
    if (!user) return false;

    const { user: { id } } = this.props;
    channel.bind(`notify-${id}`, (data) => {
      toastr.success(`${data.message}`);
      if (notifications) {
        notifications.push(data.message);
        localStorage.setItem('newNotification', JSON.stringify(notifications));
        dispatchNewNotfication(notifications);
        return false;
      }
      localStorage.setItem('newNotification', JSON.stringify([data.message]));
      dispatchNewNotfication([data.message]);
      return false;
    });
    return false;
  }

  render() {
    return (
      <Router>
        <Fragment>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/create-article" component={CreateArticle} />
            <Route path="/articles/:slug" component={ViewArticle} />
            <Route path="/articles" component={AllArticles} />
            <PrivateRoute path="/profile" component={ProfilePage} exact />
            <PrivateRoute path="/profile/articles" component={AllUserArticles} exact />
            <Route path="/profiles/:username" component={FollowAuthor} />
            <Route path="/social" component={SocialLogin} />
            <Route path="/search" component={SearchResult} />
            <Route path="/reset-password" component={PasswordReset} />
            <Route path="/update-password" component={UpdatePassword} />
            <PrivateRoute path="/notifications" component={GetNotifications} />
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { getLoggedInUser, newNotification },
)(App);
