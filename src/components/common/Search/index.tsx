import React from 'react';
import { Input } from 'antd';
import _ from 'lodash';
import { updateSearch } from '../../../utils/browserHistoryUtils';
import { readFromQueryString } from '../../../utils/queryStringUtils';

interface SearchProps {
  search: string;
  queryField: string;
  onChange?: (value: string) => void;
}

interface DefaultProps extends SearchProps{
  onChange: (value: string) => void;
}

const Search = (
  { search, queryField, onChange }: DefaultProps,
) => {
  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    updateSearch({ [queryField]: value });
    onChange(value);
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

Search.defaultProps = {
  onChange: () => {},
};

export default Search;
