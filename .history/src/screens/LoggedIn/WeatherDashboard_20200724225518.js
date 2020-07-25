/* eslint-disable react-native/no-inline-styles */
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
  RefreshControl,
  ScrollView,
  Linking,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import Geolocation from '@react-native-community/geolocation';
import {addReportDetails, signoutUser} from '../../redux/actions';
import {
  scale,
  verticalScale,
  fontScale,
  imageScale,
} from '../../../util/scaling';

const humidity = require('../../Assets/Icons/water.png');
const visibility = require('../../Assets/Icons/sunset.png');
const uvIndex = require('../../Assets/Icons/uvIndex.png');
const pressure = require('../../Assets/Icons/pressure.png');
const line = require('../../Assets/Icons/wave.png');

class WeatherDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLongitude: 'unknown', //Initial Longitude
      currentLatitude: 'unknown', //Initial Latitude
      forecast: [],
      error: '',
      refreshing: false,
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
  componentWillUnmount = () => {
    Geolocation.clearWatch(this.watchID);
  };
  render() {
    console.log('this propss', this.props.reportList.reports);
    const {navigation, reportList} = this.props;
    const ReportData =
      reportList && reportList.reports && reportList.reports.list;
    console.log('ReportData', ReportData && ReportData[0]);

    var msDiff =
      new Date().getTime() -
      new Date(ReportData && ReportData[0].dt_txt).getTime();
    var weatherUpdate = Math.floor(msDiff / (1000 * 60 * 24));

    return (
      <View>
        <View style={styles.container}>
          <ScrollView
            style={{flexDirection: 'column'}}
            horizontal={true}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
            <StatusBar backgroundColor="#ffff" />
            <View style={styles.blockView}>
              <View
                style={styles.humidityBox}>
                <Image
                  source={humidity}
                  style={styles.humidityImage}
                />
                <Text
                  style={styles.humidityText}>
                  Humidity
                </Text>
                <Text
                  style={styles.humidityValue}>
                  {ReportData && ReportData[0].main.humidity}
                </Text>
                <Text
                  style={{
                    marginLeft: 20,
                    fontFamily: 'Roboto-Regular',
                    fontSize: 16,
                    color: '#ffff',
                  }}>
                  {weatherUpdate} hours ago
                </Text>
              </View>
              <View
                style={{
                  height: '62%',
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
                    width: 45,
                    height: 45,
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
                <Image
                  source={line}
                  style={{
                    position: 'absolute',
                    marginLeft: 5,
                    flexWrap: 'wrap',
                    marginTop: 180,
                    width: 175,
                    height: 145,
                  }}
                />
                <Text
                  style={{
                    marginLeft: 20,
                    marginTop: 200,
                    fontFamily: 'Roboto-Regular',
                    fontWeight: 'bold',
                    fontSize: 26,
                    color: '#ffff',
                  }}>
                  {ReportData && ReportData[0].main.feels_like}
                </Text>
                <Text
                  style={{
                    marginLeft: 20,
                    fontFamily: 'Roboto-Regular',
                    fontSize: 16,
                    color: '#ffff',
                  }}>
                  {weatherUpdate} hours ago
                </Text>
              </View>
            </View>
            <View style={{flex: 1, marginRight: 4}}>
              <View
                style={{
                  height: '62%',
                  marginBottom: 24,
                  borderRadius: 24,
                  backgroundColor: '#05DCE7',
                  margin: 5,
                }}>
                <Image
                  source={pressure}
                  style={{
                    position: 'absolute',
                    marginLeft: 20,
                    marginTop: 30,
                    width: 30,
                    height: 30,
                  }}
                />
                <Text
                  style={{
                    marginLeft: 20,
                    marginTop: 70,
                    fontFamily: 'Roboto-Regular',
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: '#ffff',
                  }}>
                  Pressure
                </Text>
                <Image
                  source={line}
                  style={{
                    position: 'absolute',
                    marginLeft: 5,
                    flexWrap: 'wrap',
                    marginTop: 180,
                    width: 175,
                    height: 145,
                  }}
                />
                <Text
                  style={{
                    marginLeft: 20,
                    marginTop: 230,
                    fontFamily: 'Roboto-Regular',
                    fontWeight: 'bold',
                    fontSize: 26,
                    color: '#ffff',
                  }}>
                  {ReportData && ReportData[0].main.pressure}
                </Text>
                <Text
                  style={{
                    marginLeft: 20,
                    fontFamily: 'Roboto-Regular',
                    fontSize: 16,
                    color: '#ffff',
                  }}>
                  {weatherUpdate} hours ago
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
                <Text
                  style={{
                    marginLeft: 20,
                    marginTop: 40,
                    fontFamily: 'Roboto-Regular',
                    fontWeight: 'bold',
                    fontSize: 26,
                    color: '#ffff',
                  }}>
                  {ReportData && ReportData[0].visibility}
                </Text>
                <Text
                  style={{
                    marginLeft: 20,
                    fontFamily: 'Roboto-Regular',
                    fontSize: 16,
                    color: '#ffff',
                  }}>
                  {weatherUpdate} hours ago
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.button} onPress={this.open_PlayStore}>
            <Text style={styles.buttonText}>Navigate to playstore</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.signoutUser}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
        this.props.addReportDetails(this.state.forecast);
      });
  }

  open_PlayStore = () => {
    BackHandler.exitApp();

    Linking.openURL('https://play.google.com/store');
  };
  signoutUser = () => {
    this.props.signoutUser();
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    let url =
      'https://api.openweathermap.org/data/2.5/forecast?lat=' +
      this.state.currentLatitude +
      '&lon=' +
      this.state.currentLongitude +
      '&units=metric&appid=3e8628659484d984269e1ff36d017820';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('dataaa', data);
        this.setState((prevState, props) => ({
          forecast: data,
          refreshing: false,
        }));
        this.props.addReportDetails(this.state.forecast);
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 1,,
  },
  blockView: {
    flex: 1, marginRight: 24
  },
  humidityBox: {
    height: '33%',
    marginBottom: 24,
    borderRadius: 24,
    backgroundColor: '#7429D3',
    margin: 5,
  },
  humidityImage: {
    position: 'absolute',
    marginLeft: 20,
    marginTop: 30,
    width: 30,
    height: 30,
  },
  humidityText: {
    marginLeft: 20,
    marginTop: 70,
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffff',
  },
  humidityValue: {
    marginLeft: 20,
    marginTop: 50,
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: 26,
    color: '#ffff',
  },
  button: {
    width: 200,
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
  console.log('State', State);
  const {addUser, reportList} = State;
  return {
    addUser,
    reportList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addReportDetails: (addReportData) =>
    dispatch(addReportDetails(addReportData)),
  signoutUser: () => dispatch(signoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherDashboard);
