import React from 'react';
import { Provider } from 'react-native-paper';
//import { StartScreenNavigation } from './src/core';
//import { MainScreenNavigation, StartScreenNavigation } from './src/core';
import { MainScreenNavigation } from './src/core';
import { NavigationContainer } from '@react-navigation/native';

const Main = () => (
  <Provider>
    <NavigationContainer>
      <MainScreenNavigation></MainScreenNavigation>
    </NavigationContainer>
  </Provider>
)


export default Main;
