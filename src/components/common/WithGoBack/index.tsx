import React from 'react';
import { Button, Popconfirm, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import history from '../../../constants/history';
import styles from './withGoBack.module.less';

interface WithGoBackProps {
  children?: React.ReactNode;
  message?: string;
}

const WithGoBack = (
  { children, message }: WithGoBackProps,
) => (
  <>
    <Typography.Paragraph className={styles.backButtonWrapper}>
      <Popconfirm
        title={message}
        okText="Yes"
        cancelText="No"
        onConfirm={history.goBack}
      >
        <Button icon={<ArrowLeftOutlined />}>Back</Button>
      </Popconfirm>
    </Typography.Paragraph>
    {children}
  </>
);

WithGoBack.defaultProps = {
  children: undefined,
  message: 'Are you sure? The changes will be lost',
};

export default WithGoBack;
