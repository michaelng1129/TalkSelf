import React, { memo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, MainTalkScreen, RecognitionScoreScreen, SettingScreen, StudyPlanScreen } from '../../screens';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MainScreenNavigation = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: true,
      tabBarShowLabel: false,
      tabBarIcon: ({ color, size, focused }) => {
        let iconName: string = '';

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'RecognitionScore') {
          iconName = focused ? 'podium' : 'podium-outline';
        } else if (route.name === 'Talking') {
          iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
        } else if (route.name === 'StudyPlan') {
          iconName = focused ? 'person-add' : 'person-add-outline';
        } else if (route.name === 'Setting') {
          iconName = focused ? 'settings' : 'settings-outline';
        }
        return <Icon name={iconName} size={22} color={color} />;
      },
      tabBarInactiveTintColor: 'black',
      tabBarActiveTintColor: 'black',
    })}>
    <Tab.Screen name='Home' component={HomeScreen} options={{ title: 'Home', headerTitleAlign: 'center', }} />
    <Tab.Screen name='RecognitionScore' component={RecognitionScoreScreen} options={{ title: 'RecognitionScore', headerTitleAlign: 'center', }} />
    <Tab.Screen name='Talking' component={MainTalkScreen} options={{ title: 'Talking', headerTitleAlign: 'center' }} />
    <Tab.Screen name='StudyPlan' component={StudyPlanScreen} options={{ title: 'StudyPlan', headerTitleAlign: 'center', }} />
    <Tab.Screen name='Setting' component={SettingScreen} options={{ title: 'Setting', headerTitleAlign: 'center', }} />
  </Tab.Navigator>
);

export default memo(MainScreenNavigation);