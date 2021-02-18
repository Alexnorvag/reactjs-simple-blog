import React from 'react';
import { Checkbox as AntdCheckbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { updateSearch } from '../../../utils/browserHistoryUtils';
import { readFromQueryString } from '../../../utils/queryStringUtils';
import styles from './checkbox.module.less';

interface CheckboxProps {
  search: string,
  queryField: string,
  labelText?: string,
}

const Checkbox = ({ search, queryField, labelText }: CheckboxProps) => (
  <AntdCheckbox
    defaultChecked={readFromQueryString(search, queryField) === 'true'}
    onChange={(event: CheckboxChangeEvent) => updateSearch({ [queryField]: event.target.checked })}
    className={styles.personalPostsCheckbox}
  >
    {labelText}
  </AntdCheckbox>
);

Checkbox.defaultProps = {
  labelText: 'Check:',
};

export default Checkbox;
