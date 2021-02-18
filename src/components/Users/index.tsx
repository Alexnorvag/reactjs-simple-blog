import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Table, Typography } from 'antd';
import { selectors as userSelectors, actions, UserData } from './store';
import { LoadingStatuses, loadingStatuses, usersDefaultSearchParams } from '../../constants/api';
import { updateSearch } from '../../utils/browserHistoryUtils';
import SomethingWentWrong from '../common/Errors/SomethingWentWrong';
import Search from '../common/Search';
import Sorting from '../common/Sorting';
import Delete from '../common/Delete';
import styles from './usersTable.module.less';

const { pageSize } = usersDefaultSearchParams;

export default ({ location: { search } }: RouteComponentProps) => {
  const users: UserData[] = useSelector(userSelectors.selectUsers);
  const total: number = useSelector(userSelectors.selectTotal);
  const loading: LoadingStatuses = useSelector(userSelectors.selectLoading);
  const dispatch = useDispatch();

  const handleChange = (pageNumber: number) => {
    updateSearch({ pageNumber, pageSize });
  };

  useEffect(() => {
    dispatch(actions.fetchUsers(search));
  }, [search]);

  if (loading === loadingStatuses.failed) {
    return <SomethingWentWrong message="Cannot load users" />;
  }

  return (
    <>
      <Typography.Paragraph className={styles.usersFilters}>
        <Sorting search={search} queryField="sorting" />
        <Search search={search} queryField="username" />
      </Typography.Paragraph>
      <Table
        loading={loading === loadingStatuses.pending}
        pagination={{
          total,
          pageSize,
          onChange: handleChange,
        }}
        columns={[
          {
            title: 'Name',
            dataIndex: 'username',
            key: 'username',
          },
          {
            title: 'Posts count',
            dataIndex: 'postsCount',
            key: 'postsCount',
          },
          {
            dataIndex: 'actions',
            key: 'actions',
            render: (id: string) => (
              <div className={styles.userActions}>
                <Link to={`/?user=${id}`}>See user posts</Link>
                <Delete
                  onConfirm={() => dispatch(actions.deleteUser(id))}
                  entityName="user"
                />
              </div>
            ),
          },
        ]}
        dataSource={users.map(({ _id, username, posts }) => ({
          username,
          key: _id,
          actions: _id,
          postsCount: posts.length,
        }))}
      />
    </>
  );
};
