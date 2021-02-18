import React from 'react';
import { Link } from 'react-router-dom';
import parseHtml from 'html-react-parser';
import {
  Avatar,
  List,
  Space,
  Typography,
} from 'antd';
import { MessageOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { PostData } from '../../store';
import DeletePost from '../../DeletePost';
import styles from './postItem.module.less';

interface PostItemProps {
  postItem: PostData;
  currentUserId?: string|null;
}

const IconText = ({ icon, text }: { icon: any, text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const PostItem = (
  {
    currentUserId,
    postItem: {
      _id,
      title,
      body,
      user,
    },
  }: PostItemProps,
) => {
  const postLink: string = `/post/${_id}`;

  return (
    <List.Item
      key={_id}
      actions={[
        <IconText icon={UserOutlined} text={user.username} />,
        <IconText icon={MessageOutlined} text={Math.random().toFixed(1).slice(-1)} key="list-vertical-message" />,
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
        avatar={
          user._id === currentUserId
            ? (
              <>
                <Link to={`${postLink}/edit`} className={styles.editPostIcon}>
                  <EditOutlined />
                </Link>
                <DeletePost id={_id} className={styles.editPostIcon} />
              </>
            )
            : <Avatar src="'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'" />
        }
        title={<Link to={postLink}>{title}</Link>}
      />
      <Typography.Paragraph ellipsis={{ rows: 3, expandable: false, symbol: 'more' }}>
        {parseHtml(body)}
      </Typography.Paragraph>
    </List.Item>
  );
};

PostItem.defaultProps = {
  currentUserId: null,
};

export default PostItem;
