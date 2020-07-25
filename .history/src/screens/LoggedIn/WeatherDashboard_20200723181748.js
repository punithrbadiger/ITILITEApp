/* eslint-disable no-alert */
/* eslint-disable consistent-this */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Picker,
  StatusBar,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import Geolocation from '@react-native-community/geolocation';
import {
  addPostDetails,
  updateProfilePicture,
} from '../../redux/actions/addPostAction';

const humidity = require('../../Assets/Icons/water.png');
const visibility = require('../../Assets/Icons/sunset.png');
const uvIndex = require('../../Assets/Icons/uvIndex.png');

class WeatherDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLongitude: 'unknown', //Initial Longitude
      currentLatitude: 'unknown', //Initial Latitude
      forecast: [],
      error: '',
    };
  }
  componentDidMount = () => {
    var that = this;
    //Checking for the permission just after component loaded
    if (Platform.OS === 'ios') {
      this.callLocation(that);
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            that.callLocation(that);
          } else {
            alert('Permission Denied');
          }
        } catch (err) {
          alert('err', err);
          console.warn(err);
        }
      }
      requestLocationPermission();
    }
  };
  callLocation(that) {
    //alert("callLocation Called");
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        that.setState({currentLongitude: currentLongitude});
        //Setting state Longitude to re re-render the Longitude Text
        that.setState({currentLatitude: currentLatitude});
        //Setting state Latitude to re re-render the Longitude Text
        that.getWeather(that);
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    that.watchID = Geolocation.watchPosition((position) => {
      //Will give you the location on location change
      console.log(position);
      const currentLongitude = JSON.stringify(position.coords.longitude);
      //getting the Longitude from the location json
      const currentLatitude = JSON.stringify(position.coords.latitude);
      //getting the Latitude from the location json
      that.setState({currentLongitude: currentLongitude});
      //Setting state Longitude to re re-render the Longitude Text
      that.setState({currentLatitude: currentLatitude});
      //Setting state Latitude to re re-render the Longitude Text
    });
  }

  getWeather() {
    console.log('this.state.currentLatitude', this.state.currentLatitude);
    console.log('this.state.currentLongitude', this.state.currentLongitude);
    // Construct the API url to call
    let url =
      'https://api.openweathermap.org/data/2.5/forecast?lat=' +
      this.state.currentLatitude +
      '&lon=' +
      this.state.currentLongitude +
      '&units=metric&appid=3e8628659484d984269e1ff36d017820';

    // Call the API, and set the state of the weather forecast
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('dataaa', data);
        this.setState((prevState, props) => ({
          forecast: data,
        }));
      });
  }
  componentWillUnmount = () => {
    Geolocation.clearWatch(this.watchID);
  };
  render() {
    return (
      <View style={{flexDirection: 'row', backgroundColor: '#fff', margin: 1}}>
        <StatusBar backgroundColor="#ffff" />
        <View style={{flex: 1, marginRight: 24}}>
          <View
            style={{
              height: '33%',
              marginBottom: 24,
              borderRadius: 24,
              backgroundColor: '#7429D3',
              margin: 5,
            }}>
            <Image
              source={humidity}
              style={{
                position: 'absolute',
                marginLeft: 10,
                marginTop: 30,
                width: 30,
                height: 30,
              }}
            />
            <Text
              style={{
                marginLeft: 10,
                marginTop: 70,
                fontFamily: 'Roboto-Regular',
                fontWeight: 'bold',
                fontSize: 16,
                color: '#ffff',
              }}>
              {' '}
              Humidity{' '}
            </Text>
          </View>
          <View
            style={{
              height: '60%',
              borderRadius: 24,
              backgroundColor: '#C70039',
              margin: 5,
            }}>
            <Image
              source={uvIndex}
              style={{
                position: 'absolute',
                marginLeft: 10,
                marginTop: 30,
                width: 50,
                height: 50,
              }}
            />
            <Text
              style={{
                marginLeft: 10,
                marginTop: 80,
                fontFamily: 'Roboto-Regular',
                fontWeight: 'bold',
                fontSize: 16,
                color: '#ffff',
              }}>
              {' '}
              UV Index
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              height: '60%',
              marginBottom: 24,
              borderRadius: 24,
              backgroundColor: '#05DCE7',
              margin: 5,
            }}>
            <Image
              source={humidity}
              style={{
                position: 'absolute',
                marginLeft: 10,
                marginTop: 30,
                width: 30,
                height: 30,
              }}
            />
            <Text
              style={{
                marginLeft: 10,
                marginTop: 70,
                fontFamily: 'Roboto-Regular',
                fontWeight: 'bold',
                fontSize: 16,
                color: '#ffff',
              }}>
              Pressure
            </Text>
          </View>
          <View
            style={{
              height: '33%',
              borderRadius: 24,
              backgroundColor: '#F1B492',
              margin: 5,
            }}>
            <Image
              source={visibility}
              style={{
                position: 'absolute',
                marginLeft: 20,
                marginTop: 30,
                width: 50,
                height: 50,
              }}
            />
            <Text
              style={{
                marginLeft: 20,
                marginTop: 80,
                fontFamily: 'Roboto-Regular',
                fontWeight: 'bold',
                fontSize: 16,
                color: '#ffff',
              }}>
              {' '}
              Visibility{' '}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartoonView: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 300,
    height: 240,
    borderColor: '#ccececec',
    borderWidth: 7,
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },
  pickerText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
  button: {
    width: 300,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  pickerStyle: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },
});
const mapStateToProps = (State) => {
  const {addUser} = State;
  return {
    addUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addPostDetails: (addPostData) => dispatch(addPostDetails(addPostData)),
  updateProfilePicture: (ProfilePicture) =>
    dispatch(updateProfilePicture(ProfilePicture)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherDashboard);
