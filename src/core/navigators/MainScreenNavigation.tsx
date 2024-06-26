import React, { memo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, QuizScreen, SettingScreen, PerformanceScreen, TalkIndexScreen } from '../../screens';
import { DictionarySearchScreen, TextToSpeechScreen, ReadingQuizScreen, WritingQuizScreen, ListeningQuizScreen, SpeakingQuizScreen, SpeechRecognitionRootScreen, TextToSpeechPlayerScreen, } from '../components/MainScreen';
import { HeaderBackButton } from '@react-navigation/elements';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainScreenNavigation = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: true,
      tabBarShowLabel: false,
      tabBarIcon: ({ color, size, focused }) => {
        let iconName: string = '';
        
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Performance') {
          iconName = focused ? 'podium' : 'podium-outline';
        } else if (route.name === 'Talking') {
          iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
        } else if (route.name === 'Quiz') {
          iconName = focused ? 'clipboard' : 'clipboard-outline';
        } else if (route.name === 'Setting') {
          iconName = focused ? 'settings' : 'settings-outline';
        }
        return <Icon name={iconName} size={22} color={color} />;
      },
      tabBarInactiveTintColor: 'black',
      tabBarActiveTintColor: 'black',
    })}>
    <Tab.Screen name='Home' component={HomeStackNavigator} options={{ title: '' }} />
    <Tab.Screen name='Performance' component={PerformanceScreen} options={{ title: '' }} />
    <Tab.Screen name='Talking' component={TalkStackNavigator} options={{ title: '' }} />
    <Tab.Screen name='Quiz' component={QuizStackNavigator} options={{ title: '' }} />
    <Tab.Screen name='Setting' component={SettingScreen} options={{ title: '' }} />
  </Tab.Navigator>
);


const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name='DictionarySearchScreen' component={DictionarySearchScreen} options={({ navigation }) => ({
      headerTitle: '', headerLeft: () => (<HeaderBackButton labelVisible={false} onPress={() => { navigation.goBack(); }} />)
    })} />
    <Stack.Screen name='TextToSpeechScreen' component={TextToSpeechScreen} options={({ navigation }) => ({
      headerTitle: '', headerLeft: () => (<HeaderBackButton labelVisible={false} onPress={() => { navigation.goBack(); }} />)
    })} />
        <Stack.Screen name='TextToSpeechPlayerScreen' component={TextToSpeechPlayerScreen} options={({ navigation }) => ({
      headerTitle: '', headerLeft: () => (<HeaderBackButton labelVisible={false} onPress={() => { navigation.goBack(); }} />)
    })} />
  </Stack.Navigator>
);

const TalkStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="TalkIndexScreen" component={TalkIndexScreen} options={{ headerShown: false }} />
    <Stack.Screen name='SpeechRecognitionRootScreen' component={SpeechRecognitionRootScreen} options={({ navigation }) => ({
      headerTitle: '', headerLeft: () => (<HeaderBackButton labelVisible={false} onPress={() => { navigation.goBack(); }} />)
    })} />
  </Stack.Navigator>
);

const QuizStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ headerShown: false }} />
    <Stack.Screen name='ReadingQuizScreen' component={ReadingQuizScreen} options={({ navigation }) => ({
      headerTitle: '', headerLeft: () => (<HeaderBackButton labelVisible={false} onPress={() => { navigation.goBack(); }} />)
    })} />
    <Stack.Screen name='WritingQuizScreen' component={WritingQuizScreen} options={({ navigation }) => ({
      headerTitle: '', headerLeft: () => (<HeaderBackButton labelVisible={false} onPress={() => { navigation.goBack(); }} />)
    })} />
    <Stack.Screen name='ListeningQuizScreen' component={ListeningQuizScreen} options={({ navigation }) => ({
      headerTitle: '', headerLeft: () => (<HeaderBackButton labelVisible={false} onPress={() => { navigation.goBack(); }} />)
    })} />
    <Stack.Screen name='SpeakingQuizScreen' component={SpeakingQuizScreen} options={({ navigation }) => ({
      headerTitle: '', headerLeft: () => (<HeaderBackButton labelVisible={false} onPress={() => { navigation.goBack(); }} />)
    })} />

  </Stack.Navigator>
);

export default memo(MainScreenNavigation);