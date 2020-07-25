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
      <ImageBackground
        source={bgImage}
        style={{
          flex: 1,
          resizeMode: 'cover',
        }}>
        <StatusBar backgroundColor="blue" />
        <Text style={styles.logoText}>LOGIN</Text>
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
  },
  container1: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 50,
    margin: 10,
  },
  top: {
    flex: 0.3,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 160,
    height: 400,
    width: 300,
  },
  middle: {
    flex: 0.3,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 160,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    height: 200,
    width: 300,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: 'pink',
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    marginVertical: 25,
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
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
