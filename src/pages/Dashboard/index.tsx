import React from 'react';
import {View, Text, Button} from 'react-native';

import {useAuth} from '../../contexts/auth';

const Dashboard: React.FC = () => {
  const {user, signOut} = useAuth();

  function handleSignOut() {
    signOut();
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{user?.name}</Text>
      <Button title="Sign out" onPress={handleSignOut}></Button>
    </View>
  );
};

export default Dashboard;
