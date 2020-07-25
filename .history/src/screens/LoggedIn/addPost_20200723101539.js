import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Picker,
} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';
import {
  addPostDetails,
  updateProfilePicture,
} from '../../redux/actions/addPostAction';

const edit = require('../../Assets/Icons/edit/edit.png');

class addPost extends React.Component {
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
      <View style={styles.container}>
        <View style={styles.cartoonView}>
          <TouchableOpacity onPress={this.chooseFile.bind(this)}>
            {this.state.filePath.uri ? (
              <Image
                style={styles.profileImage}
                source={{uri: this.state.filePath.uri}}
              />
            ) : (
              <Image
                style={styles.profileImage}
                source={{
                  uri: this.state.filePath.uri,
                }}
              />
            )}
            <Image
              source={edit}
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                bottom: 5,
                width: 50,
                height: 50,
              }}
            />
          </TouchableOpacity>
        </View>
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
          placeholder="Description"
          placeholderTextColor="rgba(255,255,255,0.8)"
          selectionColor="#999999"
          keyboardType="default"
          maxLength={100}
          multiline
          numberOfLines={4}
          returnKeyType="next"
          onChangeText={(text) => this.setState({description: text})}
          value={this.state.description}
        />

        <TouchableOpacity style={styles.button} onPress={this.onPressAdd}>
          <Text style={styles.buttonText}>Add Post</Text>
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(addPost);
