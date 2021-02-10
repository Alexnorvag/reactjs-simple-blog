import React from 'react';
import { Result } from 'antd';

const SomethingWentWrong = ({ message }: { message?: string }) => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
    extra={message}
  />
);

SomethingWentWrong.defaultProps = {
  message: null,
};

export default SomethingWentWrong;
