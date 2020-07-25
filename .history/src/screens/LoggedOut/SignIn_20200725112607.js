import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import TouchID from 'react-native-touch-id';
import {loginSuccess} from '../../redux/actions/signUpAction';
import {
  scale,
  verticalScale,
  fontScale,
  imageScale,
} from '../../../util/scaling';

const bgImage = require('../../Assets/Images/login.png');
const email = require('../../Assets/Icons/email.png');
const lock = require('../../Assets/Icons/lock.png');
const rightArrow = require('../../Assets/Icons/rightIcon1.png');
const google = require('../../Assets/Icons/google.png');
const facebook = require('../../Assets/Icons/facebook.png');
const twitter = require('../../Assets/Icons/twitter.png');
const touchId = require('../../Assets/Icons/touchId.png');
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      biometryType: null,
    };
  }

  componentDidMount() {
    TouchID.isSupported().then((biometryType) => {
      this.setState({biometryType});
    });
  }

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.container}>
        <StatusBar backgroundColor="blue" />
        <Text style={styles.logoText}>LOGIN</Text>
        <View>
          <Text style={styles.emailTextCont}>PHONE</Text>
          <View style={styles.emailSectionStyle}>
            <Image source={email} style={styles.phoneIconStyle} />

            <TextInput
              style={styles.emailInputBox}
              keyboardType="phone-pad"
              maxLength={10}
              returnKeyType="next"
              value={this.state.value}
              onChangeText={(text) => this.setState({phone: text})}
            />
          </View>
          <Text style={styles.passwordTextCont}>PASSWORD</Text>
          <View style={styles.passwordSectionStyle}>
            <Image source={lock} style={styles.passwordIconStyle} />

            <TextInput
              style={styles.emailInputBox}
              secureTextEntry={true}
              maxLength={10}
              returnKeyType="next"
              value={this.state.value}
              onChangeText={(text) => this.setState({password: text})}
            />
          </View>
          <View style={styles.buttonSectionStyle}>
            <TouchableOpacity
              style={styles.signInButtonStyle}
              onPress={this.onPressSignIn}>
              <Image source={rightArrow} style={styles.buttonIconStyle} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.otherText}>OR</Text>
            <Text style={styles.otherText}>Login With Social Media</Text>
            <View style={styles.socialSectionStyle}>
              <View style={styles.socialButtonSectionStyle}>
                <TouchableOpacity>
                  <Image source={google} style={styles.socialIconStyle} />
                </TouchableOpacity>
              </View>
              <View style={styles.socialButtonSectionStyle}>
                <TouchableOpacity>
                  <Image source={facebook} style={styles.socialIconStyle} />
                </TouchableOpacity>
              </View>
              <View style={styles.socialButtonSectionStyle}>
                <TouchableOpacity>
                  <Image source={twitter} style={styles.socialIconStyle} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.otherFingerText}>OR Login With Touch ID</Text>
            <View style={styles.touchButtonInnerSectionStyle}>
              <View style={styles.touchButtonSectionStyle}>
                <TouchableOpacity onPress={this.clickHandler}>
                  <Image source={touchId} style={styles.touchIconStyle} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.signUpSectionStyle}>
              <Text style={styles.otherSignUpText}>Don't have an account?</Text>
              <Text> </Text>
            </View>
            <View style={styles.signUpClickStyle}>
              <TouchableOpacity onPress={this.onPressSignUp}>
                <Text style={styles.otherSignUpClickText}>Click Here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
  onPressSignIn = () => {
    if (this.props.userList.users[this.state.phone]) {
      // User exists, now check pwd
      if (
        this.props.userList.users[this.state.phone].password ===
        this.state.password
      ) {
        // Password also match
        // Dispatch loginsuccess action
        this.props.loginSuccess(this.props.userList.users[this.state.phone]);
        Toast.show('Sign In Successful ...');
      } else {
        // Wrond pwd
        // Show user alert wrong password
        Toast.show('Wrong Credentials ...');
      }
    } else {
      Toast.show('User Does Not Exists..!!');
    }
  };

  onPressSignUp = () => {
    console.log('signupp');
    this.props.navigation.navigate('SignUp');
  };

  clickHandler() {
    TouchID.isSupported(optionalConfigObject)
      .then(authenticate)
      .catch((error) => {
        alert('TouchID not supported');
      });
  }

  authenticate() {
    return TouchID.authenticate()
      .then((success) => {
        alert('Authenticated Successfully');
        if (this.props.userList.users[this.state.phone]) {
          this.props.loginSuccess(this.props.userList.users[this.state.phone]);
        } else {
          Toast.show('User Does Not Exists..!!');
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }
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

const d = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    width: d.width,
    height: d.height,
    position: 'absolute',
  },
  logoText: {
    marginVertical: 20,
    fontSize: fontScale(20),
    color: '#fff',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
  otherText: {
    fontSize: fontScale(18),
    color: '#000',
    alignSelf: 'center',
  },
  otherFingerText: {
    fontSize: fontScale(18),
    color: '#000',
    alignSelf: 'center',
    marginTop: 40,
  },
  touchButtonInnerSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-around',
  },
  otherSignUpText: {
    fontSize: fontScale(18),
    color: '#000',
    alignSelf: 'center',
    marginTop: verticalScale(150),
  },
  signUpClickStyle: {
    height: verticalScale(30),
    width: scale(90),
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: scale(250),
  },
  otherSignUpClickText: {
    fontSize: fontScale(18),
    color: '#000',
    alignSelf: 'flex-end',
    marginTop: verticalScale(120),
    textDecorationLine: 'underline',
  },
  emailSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#000',
    height: verticalScale(30),
    margin: scale(35),
    borderBottomWidth: scale(1),
  },
  passwordSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#000',
    height: verticalScale(30),
    margin: scale(35),
    borderBottomWidth: scale(1),
  },
  buttonSectionStyle: {
    flexDirection: 'row-reverse',
    marginVertical: -10,
  },
  signInButtonStyle: {
    marginRight: scale(25),
    marginBottom: verticalScale(20),
  },
  socialButtonSectionStyle: {
    height: verticalScale(20),
    width: scale(60),
  },
  socialSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-around',
  },
  touchButtonSectionStyle: {
    height: verticalScale(20),
    width: scale(60),
  },
  phoneIconStyle: {
    padding: 10,
    margin: imageScale(5),
    height: imageScale(15),
    width: imageScale(20),
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  socialIconStyle: {
    padding: 10,
    margin: imageScale(5),
    height: imageScale(35),
    width: imageScale(35),
    borderWidth: imageScale(7),
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  touchIconStyle: {
    padding: 10,
    margin: imageScale(12),
    height: imageScale(35),
    width: imageScale(35),
    borderWidth: imageScale(7),
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  signUpSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1,
    marginRight: scale(80),
  },
  passwordIconStyle: {
    padding: 10,
    margin: imageScale(5),
    height: imageScale(25),
    width: imageScale(25),
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  buttonIconStyle: {
    height: imageScale(55),
    width: imageScale(55),
    marginBottom: imageScale(20),
  },
  emailInputBox: {
    flex: 1,
    fontSize: fontScale(18),
    fontFamily: 'Roboto-Regular',
    height: verticalScale(50),
  },

  emailTextCont: {
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: verticalScale(25),
    marginLeft: scale(45),
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
  passwordTextCont: {
    flexGrow: 1,
    justifyContent: 'center',
    marginLeft: scale(45),
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
});

const mapStateToProps = (State) => {
  const {userList} = State;
  return {
    userList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginSuccess: (loginData) => dispatch(loginSuccess(loginData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
