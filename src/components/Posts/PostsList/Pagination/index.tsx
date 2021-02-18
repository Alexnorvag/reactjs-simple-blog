import React from 'react';
import { Pagination } from 'antd';
import { useSelector } from 'react-redux';
import { selectors } from '../../store';
import { updateSearch } from '../../../../utils/browserHistoryUtils';
import { readFromQueryString } from '../../../../utils/queryStringUtils';
import { postsDefaultSearchParams } from '../../../../constants/api';

const { pageSize } = postsDefaultSearchParams;

export default ({ search }: { search: string }) => {
  const pageNumber = readFromQueryString(search, 'pageNumber');
  const { total } = useSelector(selectors.selectPostsList);

  const handleChange = (value: number) => {
    updateSearch({ pageNumber: value, pageSize });
  };

  return (
    <Pagination
      current={pageNumber ? parseInt(pageNumber, 10) : 1}
      onChange={handleChange}
      defaultPageSize={pageSize}
      total={total}
    />
  );
};
