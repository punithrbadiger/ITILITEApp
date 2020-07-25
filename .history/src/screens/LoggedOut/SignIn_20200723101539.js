import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import {loginSuccess} from '../../redux/actions/signUpAction';
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
      <View style={styles.container}>
        <Image
          style={{width: 40, height: 70, marginTop: 30}}
          source={require('../../Assets/Images/logo.jpg')}
        />
        <Text style={styles.logoText}>Welcome to Global app.</Text>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Phone"
          placeholderTextColor="rgba(255,255,255,0.8)"
          selectionColor="#999999"
          keyboardType="phone-pad"
          maxLength={10}
          returnKeyType="next"
          value={this.state.value}
          onChangeText={(text) => this.setState({phone: text})}
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
          value={this.state.value}
          onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableOpacity style={styles.button} onPress={this.onPressSignIn}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Do not have an account yet?</Text>
          <TouchableOpacity onPress={this.onPressSignUp}>
            <Text style={styles.signupButton}> Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: '#455a64',
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
