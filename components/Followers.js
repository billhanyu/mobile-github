import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

class Followers extends Component {
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