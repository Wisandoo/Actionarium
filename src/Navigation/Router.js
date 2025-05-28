import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Searching, Profile, EditPost,PostDetail ,CreatePost} from '../screens';
import {Home2, Discover, ProfileCircle, AddCircle} from 'iconsax-react-native'; 
import { fontType, colors } from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.red(),
        tabBarInactiveTintColor: colors.orange(),
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 10,
          height: 70,
        },
        tabBarLabelStyle: {
          marginTop: 5,
          fontSize: 10,
          fontFamily: fontType['Pjs-Medium'],
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color}) => (
            <Home2
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Searching"
        component={Searching}
        options={{
          tabBarLabel: 'Searching',
          tabBarIcon: ({focused, color}) => (
            <Discover
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused, color}) => (
            <ProfileCircle
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />

    </Tab.Navigator>
  );
}
const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditPost"
        component={EditPost}
        options={{
          headerShown: false, 
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection : 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{ headerShown: false }}
      />

    <Stack.Screen
            name="CreatePost"
            component={CreatePost}
            options={{
              headerShown: false, 
              animationEnabled: true,
              animationTypeForReplace: 'pop',
              gestureEnabled: true,
              gestureDirection : 'horizontal',
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

    </Stack.Navigator>
  );
};
export default Router;
