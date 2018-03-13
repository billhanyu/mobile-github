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
          <View style={styles.gen}>
            <Text style={styles.repoName}>{data.name}</Text>
            <Text style={styles.text}>{ownerUsername}</Text>
          </View>
          <Text style={styles.text}>{data.description}</Text>
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
  repoName: {
    marginLeft: 12,
    fontSize: 20,
    fontWeight: 'bold',
  },
  gen: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default RepositoryItem;