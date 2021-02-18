import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton } from 'antd';
import { selectors, actions, NewPostData } from '../store';
import { loadingStatuses } from '../../../constants/api';
import SomethingWentWrong from '../../common/Errors/SomethingWentWrong';
import Editor from '../Editor';

export default () => {
  const loading = useSelector(selectors.selectCreatedPostLoading);
  const dispatch = useDispatch();

  switch (loading) {
    case loadingStatuses.pending:
      return <Skeleton active />;
    case loadingStatuses.failed:
      return <SomethingWentWrong message="Cannot create post" />;
    default:
      return (
        <Editor
          onSubmit={(postData: NewPostData) => {
            dispatch(actions.createPost(postData));
          }}
        />
      );
  }
};
