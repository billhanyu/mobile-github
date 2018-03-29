import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class NoneItem extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.text}>None</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default NoneItem;
