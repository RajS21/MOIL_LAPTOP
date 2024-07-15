import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Welcome from './App/Pages/Welcome';
import Home from './App/Pages/Home';
import InfoReport from './App/Pages/InfoReport';
import AddNewInfo from './App/Pages/AddNewInfo';
import UpdateInfo from './App/Pages/UpdateInfo';
import TotalEmployees from './App/Pages/TotalEmployees';
import TotalAmount from './App/Pages/TotalAmount';
import Charts from './App/Pages/Charts';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
        />
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="InfoReport"
          component={InfoReport}
        />
        <Stack.Screen
          name="AddNewInfo"
          component={AddNewInfo}
        />
        <Stack.Screen
          name="UpdateInfo"
          component={UpdateInfo}
        />
        <Stack.Screen
          name="TotalEmployees"
          component={TotalEmployees}
        />
        <Stack.Screen
          name="TotalAmount"
          component={TotalAmount}
        />
        <Stack.Screen
          name="Charts"
          component={Charts}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
