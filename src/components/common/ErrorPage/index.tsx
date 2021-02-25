import React from 'react';
import { Result } from 'antd';
import { RequestStatusCodeState } from '../../../utils/reducersUtils';
import styles from './errorPage.module.less';
import { requestStatusCodes } from '../../../constants/api';

const allowedStatusCodes = [
  requestStatusCodes.notFound,
  requestStatusCodes.forbidden,
  requestStatusCodes.serverError,
] as const;
const acceptableStatusCodes = ([...allowedStatusCodes] as (number|null|undefined)[]);

type AllowedStatusCode = typeof allowedStatusCodes[number];

interface ErrorPageProps {
  statusCode?: RequestStatusCodeState;
  message?: React.ReactNode;
}

const ErrorPage = ({ statusCode, message }: ErrorPageProps) => (
  <div className={styles.errorPageContent}>
    <Result
      status={
        acceptableStatusCodes.includes(statusCode)
          ? statusCode as AllowedStatusCode
          : undefined
      }
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
