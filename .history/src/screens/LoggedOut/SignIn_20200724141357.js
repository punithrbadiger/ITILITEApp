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
          <Text style={styles.signupTextCont}>EMAIL</Text>
          <View style={styles.SectionStyle}>
            <Image source={email} style={styles.ImageStyle} />

            <TextInput
              style={{flex: 1}}
              placeholder="Enter Your Name Here"
              underlineColorAndroid={'black'}
            />
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#000000',
  },
  logoText: {
    marginVertical: 20,
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    margin: 45,
    borderBottomWidth: 1,
    borderTopWidth: 1,,
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 15,
    width: 15,
    resizeMode: 'stretch',
    alignItems: 'center',
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

  signupTextCont: {
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 45,
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
