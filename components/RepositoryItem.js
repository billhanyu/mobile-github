import React, { Component } from 'react';
import { Text, View, StyleSheet, Linking, TouchableOpacity } from 'react-native';

class RepositoryItem extends Component {
  render() {
    const data = this.props.data;
    const ownerUrl = data.owner.url;
    const arr = ownerUrl.split('/');
    const ownerUsername = arr[arr.length-1];
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(data.html_url).catch(err => console.error('An error occurred', err));
        }}
      >
        <View style={styles.container}>
          <Text>{data.name}</Text>
          <Text>{ownerUsername}</Text>
          <Text>{data.description}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
});

export default RepositoryItem;