import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';

import api from '../services/api';
/**
 * auth has a fake login function for testing purposes
 * remove it and change signIn() to receive proper login parameters
 */
import * as auth from '../services/auth';

interface User {
  /**
   * add to this interface whatever user data you'll need on your app
   * just make sure your login function returns this data
   */
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  signIn(): Promise<void>;
  signOut(): void;
  initialLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SplashScreen.show();
    async function loadStoredData() {
      const storedUser = await AsyncStorage.getItem('@RNAuth:user');
      const storedToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storedToken && storedUser) {
        api.defaults.headers['Authorization'] = `Bearer ${storedToken}`;
        setUser(JSON.parse(storedUser));
      }

      setLoading(false);
      // SplashScreen.hide();
    }

    loadStoredData();
  }, []);

  async function signIn() {
    /**
     * auth.signIn is a fake login function for testing purposes
     * you'll need to replace it and its response with an actual backend call.
     */
    const response = await auth.signIn();
    setUser(response.user);

    api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <>
      {/**
       * !!user will return true if there's content in user, or false if there is none
       * as I understand, it basically creates a boolean from any value.
       */}
      <AuthContext.Provider
        value={{
          signed: !!user,
          user,
          signIn,
          signOut,
          initialLoading: loading,
        }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

//

/**
 * the function below is not entirely necessary
 * what it does is save you the trouble of importing useContext wherever you need this context.
 * you could instead just add "export default AuthContext" at the end of this file
 * then add "import {useContext} from 'react'" and "import AuthContext from '../contexts/auth'" in other files
 * and lastly grab values like so "const {signed} = useContext(AuthContext)"
 */
export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
