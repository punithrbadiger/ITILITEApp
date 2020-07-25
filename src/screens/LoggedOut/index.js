import React, {Component} from 'react';
import {Button, Image, View, TouchableOpacity, StyleSheet} from 'react-native';

//For React Navigation 4+
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SignIn from './SignIn';
import SignUp from './SignUp';

const LoginStack = createStackNavigator(
  {
    //Defination of Navigaton from setting screen
    SignIn: {screen: SignIn},
    SignUp: {screen: SignUp},
  },
  {
    // Explicitly set the default screen to use
    initialRouteName: 'SignUp',
    headerMode: 'none',
  },
);

export default createAppContainer(LoginStack);
