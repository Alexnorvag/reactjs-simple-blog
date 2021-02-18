import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
  Spin,
  Form,
  Input,
  Button,
  Typography,
} from 'antd';
import { UserAddOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { selectors, actions } from '../store';
import { AuthCredentials } from '../store/actions';
import { loadingStatuses } from '../../../constants/api';
import SomethingWentWrong from '../../common/Errors/SomethingWentWrong';
import styles from './signUp.module.less';

export default () => {
  const loading = useSelector(selectors.selectLoading);
  const [editMode, setEditMode] = useState(true);
  const dispatch = useDispatch();

  const onFinish = (values: AuthCredentials) => {
    setEditMode(false);
    dispatch(actions.signUp(values));
  };

  if (editMode) {
    return (
      <div className={styles.formWrapper}>
        <Form
          name="normal_login"
          className={styles.loginForm}
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

  switch (loading) {
    case loadingStatuses.pending:
      return (
        <div className={styles.spinWrapper}>
          <Spin size="large" tip="Signing Up..." />
        </div>
      );
    case loadingStatuses.failed:
      return (
        <SomethingWentWrong
          message={(
            <Button onClick={() => setEditMode(true)}>
              Try again
            </Button>
          )}
        />
      );
    default:
      return <Redirect to="/auth/signIn" />;
  }
};
