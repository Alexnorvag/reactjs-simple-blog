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
import { selectors, actions } from '../store';
import { AuthCredentials } from '../store/actions';
import { requestStatuses } from '../../../constants/api';
import ErrorPage from '../../common/ErrorPage';
import styles from './signUp.module.less';
import Preloader from '../../common/Preloader';

export default () => {
  const { status, statusCode } = useSelector(selectors.selectSignUpRequestState);
  const [editMode, setEditMode] = useState(true);
  const isPending = status === requestStatuses.pending;
  const dispatch = useDispatch();

  const onFinish = (values: AuthCredentials) => {
    dispatch(actions.signUp(values));
    setEditMode(false);
  };

  if (editMode || isPending || statusCode === 400) {
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
              User with given credentials already exists!
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
