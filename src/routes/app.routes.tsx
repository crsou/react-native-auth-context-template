/**
 * these are the routes when the user is authenticated.
 * here you'll probably want to change to another type of navigation, such as Tabs or Drawer
 * although depending on what your app does, Stacks may be fine.
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
  <AppStack.Navigator>
    <AppStack.Screen name="Dashboard" component={Dashboard} />
  </AppStack.Navigator>
);

export default AppRoutes;
