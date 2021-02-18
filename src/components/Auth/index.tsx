import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import NotFound from '../common/Errors/NotFound';

export default () => (
  <Switch>
    <Route exact path="/auth/signUp" component={SignUp} />
    <Route exact path="/auth/signIn" component={SignIn} />
    <NotFound />
  </Switch>
);
