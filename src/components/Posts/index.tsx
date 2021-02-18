import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PostsList from './PostsList';
import EditPost from './EditPost';
import NewPost from './NewPost';
import ViewPost from './ViewPost';
import NotFound from '../common/Errors/NotFound';

export default () => (
  <Switch>
    <Route exact path="/" component={PostsList} />
    <Route exact path="/post/:id" component={ViewPost} />
    <Route exact path="/post/:id/edit" component={EditPost} />
    <Route exact path="/post" component={NewPost} />
    <NotFound />
  </Switch>
);
