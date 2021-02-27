import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();
  const [resources, setResources] = useState([] as string[]);
  const { status, statusCode } = useDebounceSelector(
    selectors.selectCreatedPostRequestState,
  );

  switch (status) {
    case requestStatuses.pending:
      return <Preloader />;
    case requestStatuses.failed:
      return <ErrorPage statusCode={statusCode} />;
    default:
      return (
        <WithGoBack path="/">
          <Editor
            uploadAdapter={uploadAdapter(
              (postId: string) => {
                setResources((oldArray: string[]) => [...oldArray, postId]);
              },
            )}
            onSubmit={(postData: NewPostData) => {
              dispatch(actions.createPost({ ...postData, resources }));
            }}
          />
        </WithGoBack>
      );
  }
};
