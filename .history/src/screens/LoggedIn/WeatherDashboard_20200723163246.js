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
} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {
  addPostDetails,
  updateProfilePicture,
} from '../../redux/actions/addPostAction';

class WeatherDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      forecast: [],
      error: '',
    };
  }
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
            }}>
            <Text style={{marginLeft: 10, marginTop: 60}}> humidity </Text>
          </View>
          <View
            style={{
              height: '60%',
              borderRadius: 24,
              backgroundColor: '#C70039',
            }}>
            <Text style={{marginLeft: 10, marginTop: 60}}> UV Index</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              height: '60%',
              marginBottom: 24,
              borderRadius: 24,
              backgroundColor: '#05DCE7',
            }}>
            <Text style={{marginLeft: 10, marginTop: 60}}>Pressure</Text>
          </View>
          <View
            style={{
              height: '33%',
              borderRadius: 24,
              backgroundColor: '#F1B492',
            }}>
            <Text style={{marginLeft: 10, marginTop: 60}}> Visibility </Text>
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
