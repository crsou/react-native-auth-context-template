import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {signIn} from '../../services/auth';
import AuthContext from '../../contexts/auth';

const SignIn: React.FC = () => {
  const {signed} = useContext(AuthContext);
  console.log('signed: ', signed);


  async function handleSignIn() {
    const response = await signIn();

    console.log(response);
  }

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

export default SignIn;
