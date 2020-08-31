import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {PageRoute} from '../constants';
import {authenticatedSelector, login} from '../slices/authSlice';

export const LoginPage = () => {
  const isAuthenticated = useSelector(authenticatedSelector);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassowrd] = useState('');
  if (isAuthenticated) {
    return <Redirect to={{pathname: PageRoute.Home}} />;
  }
  return (
    <div className="col text-center mt-5">
      <div>Click button to login</div>
      <button type="button" className="btn btn-primary mt-1" onClick={() => dispatch(login(username, password))}>
        Login
      </button>
    </div>
  );
};
