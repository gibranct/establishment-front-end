import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

interface RouteWrapperProps extends RouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}: RouteWrapperProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated && isPrivate) {
    return <Redirect to="/" />;
  }

  if (isAuthenticated && !isPrivate) {
    return <Redirect to="/establishment" />;
  }

  return <Route {...rest} render={() => <Component />} />;
}

export default RouteWrapper;
