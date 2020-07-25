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

const edit = require('../../Assets/Icons/edit/edit.png');

class WeatherDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      email: '',
      phone: '',
      age: '',
      key: '',
      value: '',
      choosenIndex: 0,
      gender: '',
      filePath: {},
    };
  }
  render() {
    return (
      <View style={{flexDirection: 'row', backgroundColor: '#fff', margin: 2}}>
        <StatusBar backgroundColor="#ffff" />
        <View style={{flex: 1, marginRight: 24}}>
          <View
            style={{
              height: '33%',
              marginBottom: 24,
              borderWidth: 1,
              borderRadius: 24,
              backgroundColor: '#7429D3',
            }}>
            <Text style={{marginLeft: 10, marginTop: 60}}> humidity </Text>
          </View>
          <View style={{height: '60%', borderWidth: 1, borderRadius: 24}}>
            <Text style={{marginLeft: 10, marginTop: 60}}> UV Index</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              height: '60%',
              marginBottom: 24,
              borderWidth: 1,
              borderRadius: 24,
              backgroundColor: '#ACDEDA',
            }}>
            <Text style={{marginLeft: 10, marginTop: 60}}>Pressure</Text>
          </View>
          <View style={{height: '33%', borderWidth: 1, borderRadius: 24}}>
            <Text style={{marginLeft: 10, marginTop: 60}}> Visibility </Text>
          </View>
        </View>
      </View>
    );
  }

  onPressAdd = () => {
    if (
      this.state.name != '' &&
      this.state.description != '' &&
      this.state.filePath != ''
    ) {
      const AddPostDetails = {
        profile_pic: this.state.filePath.uri,
        first_name: this.state.name,
        description: this.state.description,
      };
      this.props.addPostDetails(AddPostDetails);
      this.setState({
        name: '',
        description: '',
      });
      Toast.show('Added Your Post Successfully...');
    } else {
      Toast.show('Please enter necessary details');
    }
  };
  // profile pic upload related
  chooseFile = () => {
    const options = {
      title: 'Select the perfect view',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        // eslint-disable-next-line no-console
        console.log('User cancelled image picker');
      } else if (response.error) {
        // eslint-disable-next-line no-console
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        console.log('ImagePicker response: ', source);
        this.setState({
          filePath: source,
        });
        console.log('datawwww', this.state.filePath.uri);
        this.props.updateProfilePicture(this.state.filePath.uri);
      }
    });
  };

  launchCamera = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      // eslint-disable-next-line no-console
      console.log('Response = ', response);
      if (response.didCancel) {
        // eslint-disable-next-line no-console
        console.log('User cancelled image picker');
        // eslint-disable-next-line no-alert
        // alert('User cancelled image picker');
      } else if (response.error) {
        // eslint-disable-next-line no-console
        console.log('ImagePicker Error: ', response.error);
        // eslint-disable-next-line no-alert
        // alert('ImagePicker Error: ' + response.error);
      } else {
        const source = {uri: response.uri};
        this.setState({
          filePath: source,
        });
      }
    });
  };

  launchLibrary = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      // eslint-disable-next-line no-console
      console.log('Response = ', response);
      if (response.didCancel) {
        // eslint-disable-next-line no-console
        console.log('User cancelled image picker');
        // eslint-disable-next-line no-undef
        // alert('User cancelled image picker');
      } else if (response.error) {
        // eslint-disable-next-line no-console
        console.log('ImagePicker Error: ', response.error);
        // alert('ImagePicker Error: ' + response.error);
      } else {
        const source = {uri: response.uri};
        this.setState({
          filePath: source.target.files[0],
        });
      }
    });
  };
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
