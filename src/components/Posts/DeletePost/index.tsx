import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../store';
import Delete from '../../common/Delete';

const DeletePost = (
  { id, className } : { id: string, className?: string },
) => {
  const dispatch = useDispatch();

  return (
    <Delete
      onConfirm={() => dispatch(actions.deletePost(id))}
      entityName="post"
      className={className}
    />
  );
};

DeletePost.defaultProps = {
  className: undefined,
};

export default DeletePost;
