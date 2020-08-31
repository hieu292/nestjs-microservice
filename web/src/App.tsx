import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {Header} from './components/layout/Header';
import {PageRoute, LOCAL_STORAGE_KEY} from './constants';
import {LoginPage} from './pages/LoginPage';
import {OrderDetailsPage} from './pages/OrderDetailsPage';
import {OrdersPage} from './pages/OrdersPage';
import {authenticatedSelector, loginSucceeded} from './slices/authSlice';
import {AppProtectedRoute} from './components/auth/AppProtectedRoute';

const App = () => {
  const dispatch = useDispatch();
  const savedUser = window.localStorage.getItem(LOCAL_STORAGE_KEY.USER);
  if (savedUser) {
    try {
      dispatch(loginSucceeded(JSON.parse(savedUser)));
    } catch (err) {
      console.error(err);
    }
  }

  const isAuthenticated = useSelector(authenticatedSelector);
  return (
    <div className="container">
      <Header />
      <Router>
        <Switch>
          <Route exact path={PageRoute.Login} component={LoginPage} />
          <AppProtectedRoute exact path={PageRoute.Orders} component={OrdersPage} isAuthenticated={isAuthenticated} />
          <AppProtectedRoute
            exact
            path={PageRoute.OrderDetails}
            component={OrderDetailsPage}
            isAuthenticated={isAuthenticated}
          />
          <Redirect to={PageRoute.Home} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
