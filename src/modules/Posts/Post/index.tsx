import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Skeleton, Typography } from 'antd';
import { selectors, actions } from '../store';
import { loadingStatuses } from '../../../constants/api';
import SomethingWentWrong from '../../Errors/SomethingWentWrong';

export default () => {
  const { title, body } = useSelector(selectors.selectPost);
  const loading = useSelector(selectors.selectLoading);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(actions.fetchPost(id));
  }, []);

  switch (loading) {
    case loadingStatuses.pending:
      return <Skeleton active />;
    case loadingStatuses.failed:
      return <SomethingWentWrong message="Cannot load post" />;
    default:
      return (
        <div>
          <Typography.Title>{title}</Typography.Title>
          <Typography.Text>{body}</Typography.Text>
        </div>
      );
  }
};
