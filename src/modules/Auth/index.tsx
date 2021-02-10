import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import NotFound from '../Errors/NotFound';

export default () => (
  <Switch>
    <Route exact path="/auth/signup" component={SignUp} />
    <Route exact path="/auth/signin" component={SignIn} />
    <NotFound />
  </Switch>
);
