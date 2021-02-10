import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, Skeleton } from 'antd';
import { selectors, actions } from '../store';
import { loadingStatuses } from '../../../constants/api';
import SomethingWentWrong from '../../Errors/SomethingWentWrong';
import PostItem from './PostItem';

export default () => {
  const posts = useSelector(selectors.selectPosts);
  const loading = useSelector(selectors.selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchPosts({}));
  }, []);

  switch (loading) {
    case loadingStatuses.pending:
      return <Skeleton active />;
    case loadingStatuses.failed:
      return <SomethingWentWrong message="Cannot load posts" />;
    default:
      return (
        <List
          itemLayout="vertical"
          size="large"
          pagination={{ pageSize: 3 }}
          dataSource={posts}
          renderItem={(postItem) => <PostItem postItem={postItem} />}
        />
      );
  }
};
