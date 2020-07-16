import React from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import PhoneSignIn from "./src/screens/PhoneSignIn";
import ChatScreen from './src/screens/ChatScreen';
import User from './User';

const Stack = createStackNavigator();

const App = () => {
  if (User.confirm == false) {
    return(
          <NavigationContainer>
              <Stack.Navigator>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Verify" component={PhoneSignIn} />
                  <Stack.Screen name="Home" component={HomeScreen} Options={{ headerLeft: null }} />
              </Stack.Navigator>
          </NavigationContainer>
    );
  }else{
    return(
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} Options={{ headerLeft: null }} />
              <Stack.Screen name="Chat" component={ChatScreen} options={({ route }) => ({ title: route.params.name })} />
          </Stack.Navigator>
      </NavigationContainer>
);
  }
};

export default App;
 