import React, { Component } from 'react';
import { Text, View, StyleSheet, Linking, Image, TouchableOpacity } from 'react-native';

class FollowingItem extends Component {
  render() {
    const data = this.props.data;
    console.log(data);
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(data.html_url).catch(err => console.error('An error occurred', err));
        }}
      >
        <View style={styles.container}>
          <Image key={data.avatar_url} source={{ uri: data.avatar_url }} style={{ width: 80, height: 80 }}>
          </Image>
          <View style={styles.textContainer}>
            <Text>{data.login}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
  },
});

export default FollowingItem;