import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoggedInUser } from './actions/auth';
import Index from './components/Index';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import CreateArticle from './components/article/CreateArticle';
import ViewArticle from './components/article/ViewArticle';
import ProfilePage from './components/profile/Profile';
import SocialLogin from './components/auth/SocialMediaLogin';
import NavBar from './components/presentation/NavBar';
import Footer from './components/presentation/Footer';
import NotFoundPage from './components/404/NotFoundPage';

class App extends Component {
  async componentDidMount() {
    const { getLoggedInUser: getUser } = this.props;
    await getUser();
  }

  render() {
    return (
      <Router>
        <Fragment>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/create-article" component={CreateArticle} />
            <Route path="/articles/:slug" component={ViewArticle} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/social" component={SocialLogin} />
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>

    );
  }
}

export default connect(
  null,
  { getLoggedInUser },
)(App);
