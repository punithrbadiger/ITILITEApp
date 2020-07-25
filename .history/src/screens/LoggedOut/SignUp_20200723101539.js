import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {signUpDetails} from '../../redux/actions/signUpAction';

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
      choosenIndex: 0,
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
      this.state.password != ''
    ) {
      const signUpDetails = {
        first_name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
      };
      this.props.signUpDetails(signUpDetails);
      this.setState({
        name: '',
        email: '',
        phone: '',
        password: '',
      });
      Toast.show('SignUp Successfully Done...');
      this.props.navigation.navigate('SignIn');
    } else {
      Toast.show('Please enter necessary details');
    }
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
  signUpDetails: (signUpData) => dispatch(signUpDetails(signUpData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
