import React from 'react';
import { Spin } from 'antd';
import styles from './preloader.module.less';

const Preloader = (
  { tip, className }: { tip?: string, className?: string },
) => (
  <div className={`${styles.spinWrapper}${className ? ` ${className}` : ''}`}>
    <Spin size="large" tip={tip} />
  </div>
);

Preloader.defaultProps = {
  tip: 'Loading...',
  className: '',
};

export default Preloader;
