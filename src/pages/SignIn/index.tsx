import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {useAuth} from '../../contexts/auth';
// import AuthContext from '../../contexts/auth';

const SignIn: React.FC = () => {
  // const {signed, user, signIn} = useContext(AuthContext);
  const {signed, user, signIn} = useAuth();

  console.log('signed: ', signed);
  console.log('user: ', user);

  async function handleSignIn() {
    signIn();
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

export default SignIn;
