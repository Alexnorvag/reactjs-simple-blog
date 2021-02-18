import React, { useState } from 'react';
import { Button, Input, Typography } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NewPostData } from '../store';
import styles from './editor.module.less';
import './ckeditor.override.css';

interface EditorProps {
  onSubmit: (postData: NewPostData) => any;
  initialData?: NewPostData,
}

interface DefaultProps extends EditorProps {
  initialData: NewPostData,
}

const Editor = ({ onSubmit, initialData }: DefaultProps) => {
  const [title, setTitle] = useState(initialData.title);
  const [isEditorReady, setEditorReady] = useState(false);

  let editor: any;

  const onEditorSubmit = () => {
    onSubmit({ title, body: editor.getData() });
  };

  return (
    <div>
      <Typography.Title>
        <Input
          disabled={!isEditorReady}
          placeholder="Username"
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
        />
      </Typography.Title>
      <CKEditor
        editor={ClassicEditor}
        data={initialData.body}
        disabled={!isEditorReady}
        onReady={(ckEditor: any) => {
          editor = ckEditor;

          setEditorReady(true);
        }}
      />
      <Typography.Paragraph className={styles.submitButtonWrapper}>
        <Button type="primary" disabled={!isEditorReady} onClick={onEditorSubmit}>Submit</Button>
      </Typography.Paragraph>
    </div>
  );
};

Editor.defaultProps = {
  initialData: {
    title: 'Untitled',
    body: '<p>Please enter text..</p>',
  },
};

export default React.memo(Editor);
