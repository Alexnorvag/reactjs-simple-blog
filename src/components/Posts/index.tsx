import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PostsList from './PostsList';
import EditPost from './EditPost';
import NewPost from './NewPost';
import ViewPost from './ViewPost';
import ErrorPage from '../common/ErrorPage';
import { requestStatusCodes } from '../../constants/api';

export default () => (
  <Switch>
    <Route exact path="/" component={PostsList} />
    <Route exact path="/post/:id" component={ViewPost} />
    <Route exact path="/post/:id/edit" component={EditPost} />
    <Route exact path="/post" component={NewPost} />
    <ErrorPage statusCode={requestStatusCodes.notFound} />
  </Switch>
);
