import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { actions } from '../store';

export default () => {
  const dispatch = useDispatch();

  return (
    <Button
      type="primary"
      onClick={() => dispatch(actions.signOut())}
    >
      Sign Out
    </Button>
  );
};
