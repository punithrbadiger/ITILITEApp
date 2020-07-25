//For React Navigation 4+
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import WeatherDashboard from './WeatherDashboard';

const AddPostStack = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  Dashboard: {
    screen: WeatherDashboard,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
  },
});

export default createAppContainer(AddPostStack);
