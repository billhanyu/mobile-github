import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

class Following extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Following</Text>
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

export default Following;