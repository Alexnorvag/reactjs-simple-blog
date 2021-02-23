import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions, NewPostData } from '../store';
import { requestStatuses } from '../../../constants/api';
import uploadAdapter from '../../../utils/uploadAdapter';
import useDebounceSelector from '../../../utils/useDebouncedSelector';
import ErrorPage from '../../common/ErrorPage';
import Preloader from '../../common/Preloader';
import Editor from '../Editor';

export default () => {
  const { status, statusCode } = useDebounceSelector(selectors.selectCreatedPostRequestState);
  const _id: string = useSelector(selectors.selectNewPostId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchNewPostId());
  }, []);

  switch (status) {
    case requestStatuses.pending:
      return <Preloader />;
    case requestStatuses.failed:
      return <ErrorPage statusCode={statusCode} />;
    default:
      return (
        <Editor
          uploadAdapter={uploadAdapter(_id)}
          onSubmit={(postData: NewPostData) => {
            dispatch(actions.createPost({ ...postData, _id }));
          }}
        />
      );
  }
};
