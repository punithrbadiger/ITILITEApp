//This is an example code for Bottom Navigation//
import React, {Component} from 'react';
import {Button, Image, View, TouchableOpacity, StyleSheet} from 'react-native';
//import all the basic component we have used
import Ionicons from 'react-native-vector-icons/Ionicons';
//import Ionicons to show the icon for bottom options

//For React Navigation 3+
//import {
//  createStackNavigator,
//  createBottomTabNavigator,
//  createAppContainer,
//} from 'react-navigation';

//For React Navigation 4+
import {createAppContainer} from 'react-navigation';
// import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import addPost from './addPost';

const AddPostStack = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  First: {
    screen: addPost,
    navigationOptions: ({navigation}) => ({
      title: 'Dashboard',
    }),
  },
});

export default createAppContainer(AddPostStack);
