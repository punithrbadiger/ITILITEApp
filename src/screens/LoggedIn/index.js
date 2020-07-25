//For React Navigation 4+
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import WeatherDashboard from './WeatherDashboard';

const WeatherDashboardStack = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  Dashboard: {
    screen: WeatherDashboard,
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
      },
    }),
  },
});

export default createAppContainer(WeatherDashboardStack);
