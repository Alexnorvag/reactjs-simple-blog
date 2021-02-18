import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { List, Skeleton, Typography } from 'antd';
import { selectors as postSelectors, actions } from '../store';
import { loadingStatuses, postsDefaultSearchParams } from '../../../constants/api';
import SomethingWentWrong from '../../common/Errors/SomethingWentWrong';
import Search from '../../common/Search';
import Sorting from '../../common/Sorting';
import Checkbox from '../../common/Checkbox';
import Pagination from './Pagination';
import PostItem from './PostItem';
import styles from './postsList.module.less';

const mockPostItem = {};
const previewEmptyArray = (new Array(postsDefaultSearchParams.pageSize)).fill(mockPostItem);

export default ({ location: { search } }: RouteComponentProps) => {
  const { posts, loading } = useSelector(postSelectors.selectPostsList);
  const currentUserId: string|null = localStorage.getItem('currentUserId');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchPosts(search));
  }, [search]);

  if (loading === loadingStatuses.failed) {
    return <SomethingWentWrong message="Cannot load posts" />;
  }

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={loading === loadingStatuses.pending ? previewEmptyArray : posts}
      header={(
        <Typography.Paragraph className={styles.projectsFilters}>
          <Sorting search={search} queryField="sorting" labelText="Created at" />
          <Checkbox search={search} queryField="personal" labelText="Show only personal:" />
          <div className={styles.searchPost}>
            <Search search={search} queryField="text" />
          </div>
        </Typography.Paragraph>
      )}
      footer={<Pagination search={search} />}
      renderItem={(postItem) => (
        postItem === mockPostItem
          ? <Skeleton active key={Math.random()} avatar className={styles.skeleton} />
          : <PostItem postItem={postItem} currentUserId={currentUserId} />
      )}
    />
  );
};
