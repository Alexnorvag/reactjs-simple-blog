import React from 'react';
import {
  Avatar,
  List,
  Space,
  Typography,
} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { PostData } from '../store';

interface PostItemProps {
  postItem: PostData;
}

const IconText = ({ icon, text }: { icon: any, text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default ({ postItem: { _id, title, body } }: PostItemProps) => (
  <List.Item
    key={_id}
    actions={[
      <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
      <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
      <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
    ]}
    extra={(
      <img
        width={272}
        alt="logo"
        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
      />
    )}
  >
    <List.Item.Meta
      avatar={<Avatar src="'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'" />}
      title={<Link to={`/post/${_id}`}>{title}</Link>}
    />
    <Typography.Paragraph ellipsis={{ rows: 3, expandable: false, symbol: 'more' }}>
      {body}
    </Typography.Paragraph>
  </List.Item>
);
