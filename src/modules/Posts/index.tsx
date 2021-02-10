import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PostsList from './PostsList';
import Post from './Post';
import NotFound from '../Errors/NotFound';

export default () => (
  <Switch>
    <Route exact path="/" component={PostsList} />
    <Route exact path="/post/:id" component={Post} />
    <NotFound />
  </Switch>
);
