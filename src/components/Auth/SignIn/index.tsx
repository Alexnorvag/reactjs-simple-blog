import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Location } from 'history';
import {
  Form,
  Input,
  Button,
  Typography,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { requestStatusCodes, requestStatuses } from '../../../constants/api';
import { AuthCredentials } from '../store/interfaces';
import { selectors, actions } from '../store';
import ErrorPage from '../../common/ErrorPage';
import Preloader from '../../common/Preloader';
import styles from './signIn.module.less';

export default ({ location }: { location: Location<string> }) => {
  const { status, statusCode } = useSelector(selectors.selectSignInRequestState);
  const isSignedIn = useSelector(selectors.selectSignedIn);
  const isPending = status === requestStatuses.pending;
  const dispatch = useDispatch();

  const onFinish = (values: AuthCredentials) => {
    dispatch(actions.signIn(values));
  };

  if (!isSignedIn) {
    if (
      status === requestStatuses.succeeded
      || isPending
      || statusCode === requestStatusCodes.badRequest
    ) {
      return (
        <div className={styles.formWrapper}>
          {isPending ? (
            <Preloader
              tip="Signing In..."
              className={styles.formPreloader}
            />
          ) : null}
          <Form
            name="normal_login"
            className={styles.fromContent}
            onFinish={onFinish}
          >
            <Typography.Paragraph className={styles.formIcon}>
              <UserOutlined />
            </Typography.Paragraph>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.submitButton}>
                Log in
              </Button>
              Or
              {' '}
              <Link to="/auth/signUp">register now!</Link>
            </Form.Item>
          </Form>
        </div>
      );
    }

    return (
      <ErrorPage
        message={(
          <>
            <Typography.Paragraph>Something went wrong...</Typography.Paragraph>
            <Button onClick={() => dispatch(actions.resetAuth())}>
              Try again
            </Button>
          </>
        )}
        statusCode={statusCode}
      />
    );
  }

  return <Redirect to={location.state || ''} />;
};
