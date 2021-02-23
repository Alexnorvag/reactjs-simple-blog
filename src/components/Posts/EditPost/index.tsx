import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Skeleton } from 'antd';
import { selectors, actions, NewPostData } from '../store';
import { requestStatuses } from '../../../constants/api';
import uploadAdapter from '../../../utils/uploadAdapter';
import ErrorPage from '../../common/ErrorPage';
import styles from './editPost.module.less';
import Editor from '../Editor';

export default () => {
  const {
    post,
    requestState: { status, statusCode },
  } = useSelector(selectors.selectBeingEditedPost);
  const { id } : { id: string } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchBeingEditedPost(id));
  }, []);

  switch (status) {
    case requestStatuses.pending:
      return <Skeleton active paragraph={{ rows: 12 }} className={styles.postSkeleton} />;
    case requestStatuses.failed:
      return <ErrorPage statusCode={statusCode} />;
    default:
      return (
        <Editor
          uploadAdapter={uploadAdapter(id)}
          initialData={post}
          onSubmit={(updatedPostData: NewPostData) => {
            dispatch(actions.updatePost({ id, postData: updatedPostData }));
          }}
        />
      );
  }
};
