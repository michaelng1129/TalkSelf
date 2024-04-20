import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import StartScreenNavigation from './StartScreenNavigation';
import { useAuth } from '../authContext';
import MainScreenNavigation from './MainScreenNavigation';
import { NavigationContainer } from '@react-navigation/native';

const NavigationSwitch = () => {
    const { isLoading, userToken } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {
                userToken ?
                    <MainScreenNavigation />
                    : <StartScreenNavigation />
            }
        </NavigationContainer>
    );
}


export default NavigationSwitch