import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ErrorPage from '../common/ErrorPage';
import { requestStatusCodes } from '../../constants/api';

export default () => (
  <Switch>
    <Route exact path="/auth/signUp" component={SignUp} />
    <Route exact path="/auth/signIn" component={SignIn} />
    <ErrorPage statusCode={requestStatusCodes.notFound} />
  </Switch>
);
