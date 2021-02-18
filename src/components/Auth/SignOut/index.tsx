import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { actions } from '../store';

const SignOut = ({ loading }: { loading?: boolean }) => {
  const dispatch = useDispatch();

  return (
    <Button
      loading={loading}
      type="primary"
      onClick={() => dispatch(actions.signOut())}
    >
      Sign Out
    </Button>
  );
};

SignOut.defaultProps = {
  loading: false,
};

export default SignOut;
