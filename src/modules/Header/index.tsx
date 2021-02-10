import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout, Menu } from 'antd';
import { selectors as authSelectors } from '../Auth/store';
import styles from './header.module.less';

export default () => {
  const userName = useSelector(authSelectors.selectUserName);

  return (
    <Layout.Header>
      <div className={styles.logo} />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
        <Menu.Item key="4">
          { userName || <Link to="/auth/signIn">SignIn</Link> }
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
};
