import React from 'react';
import {useAuth} from '../contexts/auth';
import SplashScreen from 'react-native-splash-screen';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  const {signed, initialLoading} = useAuth();

  if (!initialLoading) {
    SplashScreen.hide();
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
