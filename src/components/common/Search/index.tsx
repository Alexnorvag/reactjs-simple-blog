import React from 'react';
import { Input } from 'antd';
import _ from 'lodash';
import { updateSearch } from '../../../utils/browserHistoryUtils';
import { readFromQueryString } from '../../../utils/queryStringUtils';

export default ({ search, queryField }: { search: string, queryField: string }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    updateSearch({ [queryField]: event.target.value });
  };

  return (
    <Input.Search
      allowClear
      style={{ width: '40%' }}
      defaultValue={readFromQueryString(search, queryField) || undefined}
      onChange={_.debounce(handleChange, 120)}
    />
  );
};
