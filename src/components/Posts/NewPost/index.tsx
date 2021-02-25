import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestStatuses } from '../../../constants/api';
import useDebounceSelector from '../../../utils/useDebouncedSelector';
import uploadAdapter from '../../../utils/uploadAdapter';
import { NewPostData } from '../store/interfaces';
import { selectors, actions } from '../store';
import ErrorPage from '../../common/ErrorPage';
import Preloader from '../../common/Preloader';
import WithGoBack from '../../common/WithGoBack';
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
        <WithGoBack path="/">
          <Editor
            uploadAdapter={uploadAdapter(_id)}
            onSubmit={(postData: NewPostData) => {
              dispatch(actions.createPost({ ...postData, _id }));
            }}
          />
        </WithGoBack>
      );
  }
};
