import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header';
import Auth from './components/Auth';
import Users from './components/Users';
import Posts from './components/Posts';
import Footer from './components/Footer';
import history from './constants/history';
import styles from './app.module.less';

export default () => (
  <Router history={history}>
    <Layout>
      <Header />
      <Layout.Content className={styles.appContent}>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/users" component={Users} />
          <Route path="/" component={Posts} />
        </Switch>
      </Layout.Content>
      <Footer />
    </Layout>
  </Router>
);
