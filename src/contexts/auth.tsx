import React, {createContext, useState, useEffect, useContext} from 'react';
import {View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth';
import api from '../services/api';

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoredData() {
      const storedUser = await AsyncStorage.getItem('@RNAuth:user');
      const storedToken = await AsyncStorage.getItem('@RNAuth:token');

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (storedToken && storedUser) {
        api.defaults.headers['Authorization'] = `Bearer ${storedToken}`;
        setUser(JSON.parse(storedUser));
      }

      setLoading(false);
    }

    loadStoredData();
  }, []);

  async function signIn() {
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
      {loading && <ActivityIndicator size="large" color="#666" />}
      <AuthContext.Provider value={{signed: !!user, user, signIn, signOut}}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

// export default AuthContext;

/**
 * code below is unnecessary, you can un-comment the above line instead.
 * this saves you the trouble of importing useContext wherever you need this context
 * the function below does that for you.
 */
export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
