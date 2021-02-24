import React from 'react';
import { Result } from 'antd';
import { RequestStatusCodeState } from '../../../utils/reducersUtils';
import styles from './errorPage.module.less';

interface ErrorPageProps {
  statusCode?: RequestStatusCodeState;
  message?: React.ReactNode;
}

const ErrorPage = ({ statusCode, message }: ErrorPageProps) => (
  <div className={styles.errorPageContent}>
    <Result
      status={statusCode || undefined}
      title={statusCode}
      subTitle={message}
    />
  </div>
);

ErrorPage.defaultProps = {
  message: null,
  statusCode: null,
};

export default ErrorPage;
