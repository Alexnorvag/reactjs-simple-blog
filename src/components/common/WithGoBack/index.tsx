import React from 'react';
import { Path } from 'history';
import { Button, Popconfirm, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import history from '../../../constants/history';
import styles from './withGoBack.module.less';

interface WithGoBackProps {
  children?: React.ReactNode;
  message?: string;
  path?: Path;
}

const WithGoBack = (
  { children, message, path }: WithGoBackProps,
) => (
  <>
    <Typography.Paragraph className={styles.backButtonWrapper}>
      <Popconfirm
        title={message}
        okText="Yes"
        cancelText="No"
        onConfirm={path ? () => history.push(path) : history.goBack}
      >
        <Button icon={<ArrowLeftOutlined />}>Back</Button>
      </Popconfirm>
    </Typography.Paragraph>
    {children}
  </>
);

WithGoBack.defaultProps = {
  message: 'Are you sure? The changes will be lost',
  children: undefined,
  path: undefined,
};

export default WithGoBack;
