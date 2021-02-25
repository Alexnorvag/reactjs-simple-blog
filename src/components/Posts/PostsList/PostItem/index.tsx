import React from 'react';
import { Link } from 'react-router-dom';
import parseHtml from 'html-react-parser';
import { List, Space, Typography } from 'antd';
import {
  EditOutlined,
  UserOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { PostData } from '../../store/interfaces';
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
      className={styles.postItem}
      actions={[<IconText icon={UserOutlined} text={user.username} />]}
    >
      <List.Item.Meta
        avatar={(
          <>
            <Link to={postLink} className={styles.editPostIcon}>
              <EyeOutlined />
            </Link>
            {
              user._id === currentUserId ? (
                <>
                  <Link to={`${postLink}/edit`} className={styles.editPostIcon}>
                    <EditOutlined />
                  </Link>
                  <DeletePost id={_id} className={styles.editPostIcon} />
                </>
              ) : null
            }
          </>
      )}
        title={<Link to={postLink}>{title}</Link>}
      />
      <Typography.Paragraph
        ellipsis={{ rows: 3, expandable: false, symbol: 'more' }}
        className="ck-content"
      >
        {parseHtml(body)}
      </Typography.Paragraph>
    </List.Item>
  );
};

PostItem.defaultProps = {
  currentUserId: null,
};

export default PostItem;
