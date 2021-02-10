import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import { selectors, actions } from '../store';
import { loadingStatuses } from '../../../constants/api';
import SomethingWentWrong from '../../Errors/SomethingWentWrong';
import styles from './signIn.module.less';

export default () => {
  const loading = useSelector(selectors.selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.signIn({
      username: 'stefano',
      password: '1234abcD!',
    }));
  }, []);

  switch (loading) {
    case loadingStatuses.pending:
      return (
        <div className={styles.spinWrapper}>
          <Spin size="large" tip="Signing In..." />
        </div>
      );
    case loadingStatuses.failed:
      return <SomethingWentWrong />;
    default:
      return <Redirect to="/" />;
  }
};
