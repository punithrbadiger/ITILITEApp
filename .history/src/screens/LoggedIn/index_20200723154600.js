//For React Navigation 4+
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import WeatherDashboard from './WeatherDashboard';

const AddPostStack = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  Dashboard: {
    screen: WeatherDashboard,
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: '#ffff',
      },
      headerTintColor: 'rgba(255,255,255,0.6)',
    }),
  },
});

export default createAppContainer(AddPostStack);
