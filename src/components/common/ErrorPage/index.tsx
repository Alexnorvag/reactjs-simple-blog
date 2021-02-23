import React from 'react';
import { Result } from 'antd';
import { RequestStatusCodeState } from '../../../utils/reducersUtils';
import styles from './errorPage.module.less';

interface ErrorPageProps {
  statusCode?: RequestStatusCodeState;
  message?: React.ReactNode;
}

const ErrorPage = ({ statusCode, message }: ErrorPageProps) => (
  <Result
    className={styles.errorPageContent}
    status={statusCode || undefined}
    title={statusCode}
    subTitle={message}
  />
);

ErrorPage.defaultProps = {
  message: null,
  statusCode: null,
};

export default ErrorPage;
