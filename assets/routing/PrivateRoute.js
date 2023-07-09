import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const PrivateRoute = () => {
    
  const {isAdmin} = useContext(AuthContext);
    
  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute;
