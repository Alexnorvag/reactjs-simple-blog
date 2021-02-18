import React from 'react';
import { Select } from 'antd';
import { updateSearch } from '../../../utils/browserHistoryUtils';
import { readFromQueryString } from '../../../utils/queryStringUtils';
import styles from './sorting.module.less';

const { Option } = Select;

interface SortingComponentProps {
  search: string,
  queryField: string,
  labelText?: string,
}

const Sorting = ({ search, queryField, labelText }: SortingComponentProps) => {
  const fieldValue = readFromQueryString(search, queryField);

  return (
    <div>
      {labelText}
      :
      <Select
        defaultValue={fieldValue ? parseInt(fieldValue, 10) : undefined}
        onChange={(value: number) => updateSearch({ [queryField]: value })}
        className={styles.selectSortingElement}
        bordered={false}
        placeholder="Without sorting"
      >
        <Option value={1}>Ascending</Option>
        <Option value={-1}>Descending</Option>
        <Option value="">Without sorting</Option>
      </Select>
    </div>
  );
};

Sorting.defaultProps = {
  labelText: 'Sorting',
};

export default Sorting;
