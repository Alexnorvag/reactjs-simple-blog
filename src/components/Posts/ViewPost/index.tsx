import React, { useEffect } from 'react';
import parseHtml from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Skeleton, Typography, Button } from 'antd';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { selectors as postSelectors, actions } from '../store';
import { requestStatuses } from '../../../constants/api';
import history from '../../../constants/history';
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

  const redirectToMain = () => history.push('/');

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
            <Button
              onClick={redirectToMain}
              icon={<ArrowLeftOutlined />}
              className={styles.goBackButton}
            >
              Back
            </Button>
            { user._id === currentUserId ? (
              <>
                <Link to={`${id}/edit`} className={styles.editPostIcon}>
                  <EditOutlined />
                </Link>
                <DeletePost
                  id={id}
                  className={styles.editPostIcon}
                  onDelete={redirectToMain}
                />
              </>
            ) : null }
            {title}
          </Typography.Title>
          <Typography.Text>{ parseHtml(body) }</Typography.Text>
        </div>
      );
  }
};
