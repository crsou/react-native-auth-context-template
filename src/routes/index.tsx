import React, {useContext} from 'react';

// import AuthContext from '../contexts/auth';
import {useAuth} from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  //   const {signed} = useContext(AuthContext);
  const {signed} = useAuth();

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
