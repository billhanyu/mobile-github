import React, { Component } from 'react';
import { ScrollView, View, TextInput, Text, StyleSheet, Button, Keyboard } from 'react-native';
import { requestLogin, logout } from '../../actions';
import { connect } from 'react-redux';
import Profile from '../profile/Profile';
import PropTypes from 'prop-types';

class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.login = this.login.bind(this);
  }

  onChangeUsername(username) {
    this.setState({
      username,
    });
  }

  onChangePassword(password) {
    this.setState({
      password,
    });
  }

  login() {
    this.props.requestLogIn(this.state.username, this.state.password);
  }

  render() {
    const login =
      <ScrollView style={styles.container} onScroll={() => Keyboard.dismiss()} scrollEventThrottle={10}>
        <View style={styles.content}>
          <Text style={styles.error}>{this.props.error ? 'Username or Passowrd incorrect' : ''}</Text>
          <Text style={styles.text}>Username</Text>
          <TextInput
            accessibilityLabel='usernameInput'
            style={styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            spellCheck={false}
            onChangeText={this.onChangeUsername}
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            accessibilityLabel='passwordInput'
            style={styles.input}
            onChangeText={this.onChangePassword}
            onSubmitEditing={this.login}
            secureTextEntry={true}
            returnKeyType='go'
          />
          <Button
            onPress={this.login}
            title='Log In'
          />
        </View>
      </ScrollView>;

    const profile = <Profile navigator={this.props.navigator} logout={this.props.logout} mode='me' />;

    return this.props.id ? profile : login;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  content: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    marginTop: 100,
  },
  text: {
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 5,
    height: 40,
    paddingLeft: 7,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

function mapStateToProps(state) {
  return { ...state.login };
}

function mapDispatchToProps(dispatch) {
  return {
    requestLogIn: (username, password) => dispatch(requestLogin(username, password)),
    logout: () => dispatch(logout()),
  };
}

Me.propTypes = {
  requestLogIn: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  error: PropTypes.string,
  id: PropTypes.string,
  navigator: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Me);
