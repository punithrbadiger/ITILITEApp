import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import TouchID from 'react-native-touch-id';
import {signUpDetails} from '../../redux/actions/signUpAction';

const touchId = require('../../Assets/Icons/touchId.png');

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      email: '',
      phone: '',
      key: '',
      value: '',
      deviceAuth: false,
      choosenIndex: 0,
    };
  }

  componentDidMount() {
    TouchID.isSupported().then((biometryType) => {
      this.setState({biometryType});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue" />
        <Image
          style={{width: 40, height: 70, marginTop: 30}}
          source={require('../../Assets/Images/logo.jpg')}
        />
        <Text style={styles.logoText}>Welcome to Global app.</Text>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Name"
          placeholderTextColor="rgba(255,255,255,0.8)"
          selectionColor="#999999"
          keyboardType="default"
          maxLength={10}
          returnKeyType="next"
          onChangeText={(text) => this.setState({name: text})}
          value={this.state.name}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.8)"
          selectionColor="#999999"
          secureTextEntry={true}
          maxLength={10}
          returnKeyType="next"
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.8)"
          selectionColor="#999999"
          keyboardType="email-address"
          maxLength={40}
          returnKeyType="next"
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Phone"
          placeholderTextColor="rgba(255,255,255,0.8)"
          selectionColor="#999999"
          keyboardType="phone-pad"
          maxLength={10}
          returnKeyType="next"
          onChangeText={(text) => this.setState({phone: text})}
          value={this.state.phone}
        />

        <Text style={styles.otherFingerText}>Register Touch ID</Text>
        <View style={styles.touchButtonInnerSectionStyle}>
          <View style={styles.touchButtonSectionStyle}>
            <TouchableOpacity onPress={this.clickHandler}>
              <Image source={touchId} style={styles.touchIconStyle} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.onPressSignUp}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Already have an account ?</Text>
          <TouchableOpacity onPress={this.onPressSignIn}>
            <Text style={styles.signupButton}> SignIn</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onPressSignIn = () => {
    this.props.navigation.navigate('SignIn');
  };

  onPressSignUp = () => {
    if (
      this.state.name != '' &&
      this.state.email != '' &&
      this.state.phone != '' &&
      this.state.password != '' &&
      this.state.deviceAuth != false
    ) {
      const signUpDetails = {
        first_name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
        deviceAuth: this.state.deviceAuth,
      };
      this.props.signUpDetails(signUpDetails);
      this.setState({
        name: '',
        email: '',
        phone: '',
        password: '',
        deviceAuth: false,
      });
      Toast.show('SignUp Successfully Done...');
      this.props.navigation.navigate('SignIn');
    } else {
      Toast.show('Please enter necessary details');
    }
  };

  clickHandler = () => {
    TouchID.isSupported(optionalConfigObject)
      .then((res) => {
        TouchID.authenticate()
          .then((success) => {
            this.setState({deviceAuth: true});
            Toast.show('deviceAuth Successfully Done...');
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert('TouchID not supported');
      });
  };
}

const optionalConfigObject = {
  title: 'Authentication Required', // Android
  imageColor: '#e00606', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Touch sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: true,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  logoText: {
    marginVertical: 15,
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
  pickerText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    width: 300,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 35,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  otherFingerText: {
    fontSize: 18,
    color: '#ffff',
    alignSelf: 'center',
    marginTop: 10,
  },
  touchButtonInnerSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-around',
  },
  touchButtonSectionStyle: {
    height: 20,
    width: 60,
  },
  touchIconStyle: {
    padding: 10,
    margin: 12,
    height: 35,
    width: 35,
    borderWidth: 7,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});
const mapStateToProps = (State) => {
  const {addUser} = State;
  return {
    addUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signUpDetails: (signUpData) => dispatch(signUpDetails(signUpData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
