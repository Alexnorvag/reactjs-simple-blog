import React, { useEffect } from 'react';
import parseHtml from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Skeleton, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { loadingStatuses } from '../../../constants/api';
import { selectors as postSelectors, actions } from '../store';
import SomethingWentWrong from '../../common/Errors/SomethingWentWrong';
import DeletePost from '../DeletePost';
import styles from './post.module.less';

export default () => {
  const {
    loading,
    post: { title, body, user },
  } = useSelector(postSelectors.selectCurrentlyViewedPost);
  const currentUserId: string|null = localStorage.getItem('currentUserId');
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(actions.fetchPost(id));
  }, []);

  switch (loading) {
    case loadingStatuses.pending:
      return <Skeleton active />;
    case loadingStatuses.failed:
      return <SomethingWentWrong message="Cannot load post" />;
    default:
      return (
        <div>
          <Typography.Title className={styles.postTitle}>
            { user._id === currentUserId ? (
              <>
                <Link to={`${id}/edit`} className={styles.editPostIcon}>
                  <EditOutlined />
                </Link>
                <DeletePost id={id} className={styles.editPostIcon} />
              </>
            ) : null }
            {title}
          </Typography.Title>
          <Typography.Text>{ parseHtml(body) }</Typography.Text>
        </div>
      );
  }
};
