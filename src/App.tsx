import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './modules/Header';
import Posts from './modules/Posts';
import Auth from './modules/Auth';
import Footer from './modules/Footer';

export default () => (
  <BrowserRouter>
    <Layout>
      <Header />
      <Layout.Content style={{ padding: '0 50px' }}>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" component={Posts} />
        </Switch>
      </Layout.Content>
      <Footer />
    </Layout>
  </BrowserRouter>
);
