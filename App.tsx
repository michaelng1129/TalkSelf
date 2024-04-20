import React, { useEffect } from 'react';
import { Provider } from 'react-native-paper';
//import { StartScreenNavigation } from './src/core';
//import { MainScreenNavigation, StartScreenNavigation } from './src/core';
import { AuthProvider } from './src/core';
import NavigationSwitch from './src/core/navigators/NavigationSwitch';

const Main = () => (
  <Provider>
    <AuthProvider>
      <NavigationSwitch />
    </AuthProvider>
  </Provider>

)

export default Main;