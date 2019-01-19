import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Index from './components/Index';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import CreateArticle from './components/article/CreateArticle';
import ViewArticle from './components/article/ViewArticle';
import ProfilePage from './components/profile/Profile';
import NavBar from './components/presentation/NavBar';
import Footer from './components/presentation/Footer';

const App = () => (
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
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

export default App;
