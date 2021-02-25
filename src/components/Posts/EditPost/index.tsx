import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Skeleton } from 'antd';
import { selectors, actions, NewPostData } from '../store';
import useDebounceSelector from '../../../utils/useDebouncedSelector';
import uploadAdapter from '../../../utils/uploadAdapter';
import { requestStatuses } from '../../../constants/api';
import ErrorPage from '../../common/ErrorPage';
import WithGoBack from '../../common/WithGoBack';
import Editor from '../Editor';
import styles from './editPost.module.less';

export default () => {
  const {
    post,
    requestState: { status, statusCode },
  } = useDebounceSelector(selectors.selectBeingEditedPost);
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
        <WithGoBack>
          <Editor
            uploadAdapter={uploadAdapter(id)}
            initialData={post}
            onSubmit={(updatedPostData: NewPostData) => {
              dispatch(actions.updatePost({ id, postData: updatedPostData }));
            }}
          />
        </WithGoBack>
      );
  }
};
