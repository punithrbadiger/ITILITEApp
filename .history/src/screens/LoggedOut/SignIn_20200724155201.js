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
import {connect} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import {
  scale,
  verticalScale,
  fontScale,
  imageScale,
} from '../../../util/scaling';
import {loginSuccess} from '../../redux/actions/signUpAction';

const bgImage = require('../../Assets/Images/login.png');
const email = require('../../Assets/Icons/email.png');
const lock = require('../../Assets/Icons/lock.png');
const rightArrow = require('../../Assets/Icons/rightIcon1.png');
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
    };
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
            />
          </View>
          <View style={styles.buttonSectionStyle}>
            <TouchableOpacity
              style={{
                marginRight: 25,
                marginBottom: 40,
              }}>
              <Image source={rightArrow} style={styles.buttonIconStyle} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.otherText}>LOGIN</Text>
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
    this.props.navigation.navigate('SignUp');
  };
}
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
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
  otherText: {
    marginBottom: 10,
    fontSize: 20,
    color: '#000',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
  emailSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#000',
    height: 40,
    margin: 45,
    borderBottomWidth: 1,
  },
  passwordSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#000',
    height: 40,
    margin: 45,
    borderBottomWidth: 1,
  },
  buttonSectionStyle: {
    flexDirection: 'row-reverse',
    marginVertical: -23,
  },
  phoneIconStyle: {
    padding: 10,
    margin: 5,
    height: 15,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  passwordIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  buttonIconStyle: {
    height: 65,
    width: 65,
    marginBottom: 40,
  },
  emailInputBox: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },

  emailTextCont: {
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 45,
    marginLeft: 45,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
  passwordTextCont: {
    flexGrow: 1,
    justifyContent: 'center',
    marginLeft: 45,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
  signupText: {
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
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  wrapper: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'grey',
  },
  scrollViewWrapper: {
    marginTop: 70,
    flex: 1,
  },
  avoidView: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    flex: 1,
  },
  loginHeader: {
    fontSize: 28,
    color: '#ffff',
    fontWeight: '300',
    marginBottom: 40,
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
