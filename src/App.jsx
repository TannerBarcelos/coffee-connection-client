import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

// Components
import { Nav } from './components/Nav';
import { Locations } from './components/Locations';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [state, setState] = useState({
    role: 'guest',
    isAuthenticated: false,
    userInformation: {},
  });

  const setUser = (userRole, auth, user) => {
    setState({
      role: userRole,
      isAuthenticated: auth,
      userInformation: { ...user },
    });
  };

  return (
      <Router>
        <Nav userAgent={state.role} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route
            path="/locations"
            element={
              <Locations
                isAuthenticated={state.isAuthenticated}
                userInformation={state.userInformation}
              />
            }
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/register"
            element={<Register setUser={setUser} />}
          />
          <Route path="/profile"
            element={<Profile userInfo={state.userInformation} />}
            isAuthenticated={state.isAuthenticated}
          />
          {/* <Route path="/dashboard" element={<ProtectedRoute
            path="/dashboard"
            element={<Dashboard />}
            isAuthenticated={state.isAuthenticated}
          />}/> */}
        </Routes>
      </Router>
  );
};

export default App;
