import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Content from './Content';
import { NavigatorIOS } from 'react-native';

const store = configureStore();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigatorIOS
          initialRoute={{
            component: Content,
            title: '',
          }}
          navigationBarHidden
          style={{ flex: 1 }}
        />
      </Provider>
    );
  }
}

export default Root;
