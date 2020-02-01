import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './app/screens/Main';
import Search from './app/screens/Search';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//
const MainStack = createStackNavigator({
  Explore: {screen: Main}
})

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    Search: {
      screen: Search
    },
  },
  {
    mode: "modal",
    headerMode: "none",
  }
)

const AppContainer = createAppContainer(RootStack);



export default function App() {
  return (
    <AppContainer/>
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
