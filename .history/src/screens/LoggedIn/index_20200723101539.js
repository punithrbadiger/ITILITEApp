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
import PostList from './PostList';

class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('../../Assets/Icons/drawer-150x150.png')}
            style={{width: 25, height: 25, marginLeft: 5}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const AddPostStack = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  First: {
    screen: addPost,
    navigationOptions: ({navigation}) => ({
      title: 'Add Post',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: '#455a64',
      },
      headerTintColor: 'rgba(255,255,255,0.6)',
    }),
  },
});

const PostListStack = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  First: {
    screen: PostList,
    navigationOptions: ({navigation}) => ({
      title: 'Post List',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: '#455a64',
      },
      headerTintColor: 'rgba(255,255,255,0.6)',
    }),
  },
});

const DrawerHome = createDrawerNavigator({
  //Drawer Optons and indexing
  Screen1: {
    //Title
    screen: AddPostStack,
    navigationOptions: {
      drawerLabel: 'Add Post',
    },
  },
  Screen2: {
    //Title
    screen: PostListStack,
    navigationOptions: {
      drawerLabel: 'Post List',
    },
  },
});

export default createAppContainer(DrawerHome);
