import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Content from './Content';

const store = configureStore();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Content />
      </Provider>
    );
  }
}

export default Root;
