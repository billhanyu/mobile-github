import React, { Component } from 'react';
import { View, StyleSheet, Text, ListView } from 'react-native';
import ID from '../../constants/id';

class Followers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: [],
    };
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Followers</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Followers;