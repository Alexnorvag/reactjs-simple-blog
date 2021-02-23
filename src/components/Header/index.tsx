import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Layout, Menu } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';
import { selectors as authSelectors } from '../Auth/store';
import { requestStatuses } from '../../constants/api';
import SignOut from '../Auth/SignOut';
import styles from './header.module.less';

export default () => {
  const { pathname } = useLocation();
  const useName: string = useSelector(authSelectors.selectUserName);
  const signedIn: boolean = useSelector(authSelectors.selectSignedIn);
  const authLoading: boolean = useSelector(authSelectors.selectRequestState)
    .status === requestStatuses.pending;

  return (
    <Layout.Header className={styles.navHeader}>
      <Link to="/" className={styles.logo}>
        <HighlightOutlined />
      </Link>
      {
        signedIn
          ? (
            <>
              <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
                <Menu.Item key="/post">
                  <Link to="/post">
                    Create Post
                  </Link>
                </Menu.Item>
                <Menu.Item key="/users">
                  <Link to="/users">
                    Manage Users
                  </Link>
                </Menu.Item>
              </Menu>
              <div>
                <span className={styles.usernameInHeader}>{useName}</span>
                {' '}
                <SignOut loading={authLoading} />
              </div>
            </>
          )
          : (
            <Link to="/auth/signIn">
              <Button type="default" loading={authLoading}>Sign In</Button>
            </Link>
          )
      }
    </Layout.Header>
  );
};
