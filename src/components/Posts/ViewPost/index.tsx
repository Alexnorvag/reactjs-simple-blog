import React, { useEffect } from 'react';
import parseHtml from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Skeleton, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { requestStatuses } from '../../../constants/api';
import { selectors as postSelectors, actions } from '../store';
import ErrorPage from '../../common/ErrorPage';
import DeletePost from '../DeletePost';
import styles from './post.module.less';

export default () => {
  const {
    post: { title, body, user },
    requestState: { statusCode, status },
  } = useSelector(postSelectors.selectCurrentlyViewedPost);
  const currentUserId: string|null = localStorage.getItem('currentUserId');
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(actions.fetchPost(id));
  }, []);

  switch (status) {
    case requestStatuses.pending:
      return <Skeleton active />;
    case requestStatuses.failed:
      return <ErrorPage statusCode={statusCode} />;
    default:
      return (
        <div className="ck-content">
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
