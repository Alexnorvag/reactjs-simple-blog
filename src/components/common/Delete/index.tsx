import React from 'react';
import { Typography, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons/lib';

interface DeleteComponentProps {
  onConfirm: () => void,
  className?: string,
  entityName?: string,
}

const Delete = (
  { onConfirm, className, entityName } : DeleteComponentProps,
) => (
  <Popconfirm
    title={`Are you sure to delete this${entityName ? ` ${entityName}` : ''}?`}
    onConfirm={onConfirm}
    okText="Yes"
    cancelText="No"
  >
    <Typography.Link className={className}>
      <DeleteOutlined />
    </Typography.Link>
  </Popconfirm>
);

Delete.defaultProps = {
  className: undefined,
  entityName: undefined,
};

export default Delete;
