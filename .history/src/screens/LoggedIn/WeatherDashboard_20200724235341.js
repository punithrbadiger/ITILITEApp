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
            <View style={styles.humidityUVBlockView}>
              <View style={styles.humidityBox}>
                <Image source={humidity} style={styles.humidityImage} />
                <Text style={styles.humidityText}>Humidity</Text>
                <Text style={styles.humidityValue}>
                  {ReportData && ReportData[0].main.humidity}
                </Text>
                <Text style={styles.timeStyle}>{weatherUpdate} hours ago</Text>
              </View>
              <View style={styles.uvIndexBox}>
                <Image source={uvIndex} style={styles.uvIndexImage} />
                <Text style={styles.uvIndexText}> UV Index</Text>
                <Image source={line} style={styles.indexLine} />
                <Text style={styles.uvIndexValue}>
                  {ReportData && ReportData[0].main.feels_like}
                </Text>
                <Text style={styles.timeStyle}>{weatherUpdate} hours ago</Text>
              </View>
            </View>
            <View style={styles.pressureVisiblBlockView}>
              <View style={styles.pressureBox}>
                <Image source={pressure} style={styles.pressureImage} />
                <Text style={styles.pressureText}>Pressure</Text>
                <Image source={line} style={styles.indexLine} />
                <Text style={styles.pressureValue}>
                  {ReportData && ReportData[0].main.pressure}
                </Text>
                <Text style={styles.timeStyle}>{weatherUpdate} hours ago</Text>
              </View>
              <View style={styles.visibilityBox}>
                <Image source={visibility} style={styles.visibilityImage} />
                <Text style={styles.visibilityText}> Visibility </Text>
                <Text style={styles.visibilityValue}>
                  {ReportData && ReportData[0].visibility}
                </Text>
                <Text style={styles.timeStyle}>{weatherUpdate} hours ago</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.bottomSectionStyle}>
          <TouchableOpacity
            style={styles.bottomButtonStyle}
            onPress={this.open_PlayStore}>
            <Text style={styles.bottomButtonTextStyle}>
              Navigate to playstore
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomButtonStyle}
            onPress={this.signoutUser}>
            <Text style={styles.bottomButtonTextStyle}>Logout</Text>
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
    margin: scale(1),
  },
  humidityUVBlockView: {
    flex: 1,
    marginRight: scale(24),
  },
  humidityBox: {
    height: '33%',
    marginBottom: verticalScale(4),
    borderRadius: scale(24),
    backgroundColor: '#7429D3',
    margin: scale(5),
  },
  humidityImage: {
    position: 'absolute',
    marginLeft: imageScale(20),
    marginTop: imageScale(30),
    width: imageScale(30),
    height: imageScale(30),
  },
  humidityText: {
    marginLeft: scale(20),
    marginTop: verticalScale(70),
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: fontScale(16),
    color: '#ffff',
  },
  humidityValue: {
    marginLeft: scale(20),
    marginTop: verticalScale(25),
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: fontScale(26),
    color: '#ffff',
  },
  timeStyle: {
    marginLeft: scale(20),
    fontFamily: 'Roboto-Regular',
    fontSize: scale(16),
    color: '#ffff',
  },
  uvIndexBox: {
    height: '66%',
    borderRadius: scale(24),
    backgroundColor: '#C70039',
    margin: scale(5),
  },
  uvIndexImage: {
    position: 'absolute',
    marginLeft: imageScale(10),
    marginTop: imageScale(25),
    width: imageScale(45),
    height: imageScale(45),
  },
  uvIndexText: {
    marginLeft: scale(10),
    marginTop: verticalScale(80),
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: fontScale(16),
    color: '#ffff',
  },
  indexLine: {
    position: 'absolute',
    marginLeft: scale(5),
    flexWrap: 'wrap',
    marginTop: verticalScale(150),
    width: scale(175),
    height: verticalScale(145),
  },
  uvIndexValue: {
    marginLeft: scale(20),
    marginTop: verticalScale(166),
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: fontScale(26),
    color: '#ffff',
  },
  pressureVisiblBlockView: {
    flex: 1,
    marginRight: scale(4),
  },
  pressureBox: {
    height: '58%',
    marginBottom: verticalScale(24),
    borderRadius: scale(24),
    backgroundColor: '#05DCE7',
    margin: scale(5),
  },
  pressureImage: {
    position: 'absolute',
    marginLeft: imageScale(20),
    marginTop: imageScale(30),
    width: imageScale(30),
    height: imageScale(30),
  },
  pressureText: {
    marginLeft: scale(20),
    marginTop: verticalScale(70),
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: fontScale(16),
    color: '#ffff',
  },
  pressureValue: {
    marginLeft: scale(20),
    marginTop: verticalScale(140),
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: fontScale(26),
    color: '#ffff',
  },
  visibilityBox: {
    height: '33%',
    borderRadius: scale(24),
    backgroundColor: '#F1B492',
    margin: scale(5),
  },
  visibilityImage: {
    position: 'absolute',
    marginLeft: imageScale(20),
    marginTop: imageScale(20),
    width: imageScale(50),
    height: imageScale(50),
  },
  visibilityText: {
    marginLeft: scale(20),
    marginTop: verticalScale(70),
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: fontScale(16),
    color: '#ffff',
  },
  visibilityValue: {
    marginLeft: scale(20),
    marginTop: verticalScale(20),
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: fontScale(26),
    color: '#ffff',
  },
  bottomSectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottomButtonStyle: {
    width: scale(180),
    backgroundColor: '#1c313a',
    borderRadius: scale(25),
    marginVertical: verticalScale(20),
    paddingVertical: verticalScale(13),
  },
  bottomButtonTextStyle: {
    fontSize: fontScale(16),
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
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
