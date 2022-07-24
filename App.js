import React, {useEffect} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chats from './screens/Chats';
import Settings from './screens/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from './config/constants'
import Signup from './screens/Signup';
import SignIn from './screens/SignIn';
import Chat from './screens/Chat';
import {Provider, DefaultTheme} from 'react-native-paper';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};


firebase.initializeApp(firebaseConfig);

const ChatsStack = createStackNavigator()

const ChatsScreen = () => (

  <ChatsStack.Navigator>
    <ChatsStack.Screen name="Chats" component={Chats} />
    <ChatsStack.Screen name="Chat" component={Chat} />
  </ChatsStack.Navigator>

)
const SettingsStack = createStackNavigator()

const SettingScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={Settings} />
    </SettingsStack.Navigator>
  )
}

const Tabs = createBottomTabNavigator()

const TabsNavigator = () => {
  const navigation = useNavigation();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if(!user) {
        navigation.navigate("Signup")
      }
    });
    }, []);

  return (
    <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Chatapp') {
          iconName = focused
            ? 'chatbubbles'
            : 'ios-chatbubbles-outline';
        } else if (route.name === 'Settings') {
          iconName = focused
            ? 'settings'
            : 'settings-outline';
        }


        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: 'gray',
    })}

  >
    <Tabs.Screen name="Chatapp" component={Chats} />
    <SettingsStack.Screen name="Settings" component={Settings} />
    
  </Tabs.Navigator>
  )
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#28b5f4',
    secondary: '#28b5f4',
    tertiary: '#28b5f4'
  },
};

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Provider theme={theme}>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        presentation: "modal",
      }}>
        <Stack.Screen name="Tabs" component={TabsNavigator} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Signup" component={Signup} options={{presentation: 'fullScreenModal'}} />
        <Stack.Screen name="SignIn" component={SignIn} options={{presentation: 'fullScreenModal'}} />
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

export default App;