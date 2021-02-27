import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../store';
import Delete from '../../common/Delete';

const DeletePost = (
  {
    id,
    className,
    onDelete,
  } : {
    id: string,
    className?: string,
    onDelete?: () => void,
  },
) => {
  const dispatch = useDispatch();

  return (
    <Delete
      onConfirm={async () => {
        await dispatch(actions.deletePost(id));

        if (onDelete) onDelete();
      }}
      entityName="post"
      className={className}
    />
  );
};

DeletePost.defaultProps = {
  className: undefined,
  onDelete: undefined,
};

export default DeletePost;
