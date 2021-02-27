import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Typography,
} from 'antd';
import { UserAddOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { requestStatusCodes, requestStatuses } from '../../../constants/api';
import userCredentials from '../../../constants/userCredentials';
import { AuthCredentials } from '../store/interfaces';
import { selectors, actions } from '../store';
import ErrorPage from '../../common/ErrorPage';
import Preloader from '../../common/Preloader';
import styles from './signUp.module.less';

export default () => {
  const { status, statusCode } = useSelector(selectors.selectSignUpRequestState);
  const [editMode, setEditMode] = useState(true);
  const isPending = status === requestStatuses.pending;
  const dispatch = useDispatch();

  const onFinish = (values: AuthCredentials) => {
    dispatch(actions.signUp(values));
    setEditMode(false);
  };

  if (
    editMode
    || isPending
    || statusCode === requestStatusCodes.badRequest
  ) {
    return (
      <div className={styles.formWrapper}>
        {isPending ? (
          <Preloader
            tip="Signing Up..."
            className={styles.formPreloader}
          />
        ) : null}
        <Form
          name="normal_login"
          className={styles.fromContent}
          onFinish={onFinish}
        >
          <Typography.Paragraph className={styles.formIcon}>
            <UserAddOutlined />
          </Typography.Paragraph>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
              {
                message: 'Too short...',
                min: userCredentials.username.minLength,
              },
              {
                message: 'Too long...',
                max: userCredentials.username.maxLength,
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
              {
                message: 'Too weak!',
                pattern: userCredentials.password.pattern,
              },
              {
                message: 'Too short...',
                min: userCredentials.password.minLength,
              },
              {
                message: 'Too long...',
                max: userCredentials.password.maxLength,
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.submitButton}>
              Sign up
            </Button>
            Or
            {' '}
            <Link to="/auth/signIn">sign in</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }

  if (status === requestStatuses.failed) {
    return (
      <ErrorPage
        message={(
          <>
            <Typography.Paragraph>
              {
                statusCode === requestStatusCodes.conflict
                  ? 'User with given credentials already exists!'
                  : 'Something went wrong...'
              }
            </Typography.Paragraph>
            <Button onClick={() => setEditMode(true)}>
              Try again
            </Button>
          </>
        )}
        statusCode={statusCode}
      />
    );
  }

  return <Redirect to="/auth/signIn" />;
};
