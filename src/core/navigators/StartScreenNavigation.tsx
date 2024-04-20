import React, { memo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IndexScreen, LoginScreen, RegisterScreen, ForgotPasswordScreen } from '../../screens';
//import MainScreen from './MainScreen'

const Stack = createNativeStackNavigator();

const StartScreenNavigation = () => (
    <Stack.Navigator initialRouteName="IndexScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="IndexScreen" component={IndexScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        {/* <Stack.Screen name='' */}
    </Stack.Navigator>
);

export default memo(StartScreenNavigation);