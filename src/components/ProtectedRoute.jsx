import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) return <Component {...props} />;
        else navigate('/', {state: {from: props.location}})
      }}
    />
  );
};

