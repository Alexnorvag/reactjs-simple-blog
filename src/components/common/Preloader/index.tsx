import React from 'react';
import { Spin } from 'antd';
import styles from './preloader.module.less';

const Preloader = ({ tip }: { tip?: string }) => (
  <div className={styles.spinWrapper}>
    <Spin size="large" tip={tip} />
  </div>
);

Preloader.defaultProps = {
  tip: 'Loading...',
};

export default Preloader;
