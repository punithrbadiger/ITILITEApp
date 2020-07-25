//This is an example code for Bottom Navigation//
import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoggedOut from './src/screens/LoggedOut';
import LoggedIn from './src/screens/LoggedIn';
import NavigationService from './util/NavigationService';

class Root extends React.Component {
  componentDidMount() {
    const {userLoggedIn} = this.props;
  }
  render() {
    const {userLoggedIn} = this.props.userList;
    if (!userLoggedIn === true) {
      return (
        <LoggedOut
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
          onNavigationStateChange={this.onSwitchScreen}
        />
      );
    } else {
      return (
        <LoggedIn
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
          onNavigationStateChange={this.onSwitchScreen}
        />
      );
    }
  }
}

const mapStateToProps = (reduxState) => {
  const {userList} = reduxState;
  return {
    userList,
  };
};

export default connect(mapStateToProps, {})(Root);
