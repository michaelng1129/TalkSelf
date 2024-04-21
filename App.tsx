import React, { useEffect } from 'react';
import { Provider } from 'react-native-paper';
import { AuthProvider } from './src/core';
import NavigationSwitch from './src/core/navigators/NavigationSwitch';

const Main = () => (
  <AuthProvider>
    <NavigationSwitch />
  </AuthProvider>
)

export default Main;
