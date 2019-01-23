import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Index from './components/Index';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import CreateArticle from './components/article/CreateArticle';
import ViewArticle from './components/article/ViewArticle';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/create-article" component={CreateArticle} />
      <Route path="/articles/:slug" component={ViewArticle} />
    </Switch>
  </Router>
);

export default App;
