import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import OnBoardScreen from './components/OnBoardScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';
import COLORS from './const/colors';


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function HomeTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        style: {
          // height: 50,
          borderTopWidth: 0,
          elevation: 0,
        },
        showLabel: false,
        activeTintColor: '#c8ea88',
        tabBarStyle: {
          backgroundColor: '#00162a',
          borderRadius: 30,
          paddingTop: 5,
          // height: 70,
          marginBottom: 20,
        },
        tabBarLabelStyle: {
          marginBottom: -12,
          
        },
        headerShown: false
      }}

    >
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: () => (
          <Ionicons name="home" color={'white'} size={28} />
        ),

      }} />
      <Tab.Screen
        name="Chat"
        component={Home}
        options={{
          tabBarIcon: () => (
            <View>
              <Icon name="chat-bubble" color={'white'} size={28} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderColor: 'black',
                borderWidth: 2,
                borderRadius: 30,
                top: -15,
                elevation: 5,
              }}>
              <Icon name="search" color={'#7f5c4c'} size={28} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Home}
        options={{
          tabBarIcon: () => (
            <Icon name="favorite" color={'white'} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Home}
        options={{
          tabBarIcon: () => (
            <Icon name="shopping-cart" color={'white'} size={28} />
          ),
        }}
      />

    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='BoardScreen' component={OnBoardScreen} />
          <Stack.Screen name='HomeTab' component={HomeTab} />
          <Stack.Screen name='Product Detail' component={ProductDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  )
}

