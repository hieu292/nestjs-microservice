import React from 'react';
import ProtectedRoute from './ProtectedRoute';
import {PageRoute} from '../../constants';

type AppProtectedRouteProps = {
  exact: boolean;
  path: string;
  component: any;
  isAuthenticated: boolean;
};
export const AppProtectedRoute: React.FC<AppProtectedRouteProps> = (props) => {
  return (
    <ProtectedRoute {...props} isAllowed restrictedPath={PageRoute.Restricted} authenticationPath={PageRoute.Login} />
  );
};
