//For React Navigation 4+
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import addPost from './addPost';

const AddPostStack = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  Dashboard: {
    screen: addPost,
    navigationOptions: ({navigation}) => ({}),
  },
});

export default createAppContainer(AddPostStack);
