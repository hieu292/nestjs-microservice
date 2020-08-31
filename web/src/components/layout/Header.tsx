import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logout, userSelector} from '../../slices/authSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  if (user) {
    return (
      <div className="col text-right">
        <span className="align-middle">{user.name}</span>
        <button type="button" className="btn btn-link" onClick={() => dispatch(logout())}>
          Logout
        </button>
      </div>
    );
  }
  return <React.Fragment />;
};
