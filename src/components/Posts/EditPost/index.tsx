import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Skeleton } from 'antd';
import { selectors, actions, NewPostData } from '../store';
import { loadingStatuses } from '../../../constants/api';
import SomethingWentWrong from '../../common/Errors/SomethingWentWrong';
import styles from './editPost.module.less';
import Editor from '../Editor';

export default () => {
  const { post, loading } = useSelector(selectors.selectBeingEditedPost);
  const { id } : { id: string } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchBeingEditedPost(id));
  }, []);

  switch (loading) {
    case loadingStatuses.pending:
      return <Skeleton active paragraph={{ rows: 12 }} className={styles.postSkeleton} />;
    case loadingStatuses.failed:
      return <SomethingWentWrong message="Cannot load post" />;
    default:
      return (
        <Editor
          initialData={post}
          onSubmit={(updatedPostData: NewPostData) => {
            dispatch(actions.updatePost({ id, postData: updatedPostData }));
          }}
        />
      );
  }
};
