import React, { Component } from 'react';
import { Text, View, StyleSheet, Linking, TouchableOpacity, Button } from 'react-native';
import { star, unstar } from '../../actions';
import { connect } from 'react-redux';

class RepositoryItem extends Component {
  render() {
    const data = this.props.data;
    let ownerUrl;
    let arr;
    let ownerUsername;
    if (data !== 'None') {
      ownerUrl = data.owner.url;
      arr = ownerUrl.split('/');
      ownerUsername = arr[arr.length-1];
    }
    return (
      data == 'None'
      ?
      <View style={styles.container}>
        <Text style={styles.noneText}>
          None
        </Text>
      </View>
      :
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
          <Button
            onPress={()=>this.props.star(data.owner.login, data.name)}
            title='star'
          />
          <Button
            onPress={()=>this.props.unstar(data.owner.login, data.name)}
            title='unstar'
          />
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
    flexDirection: 'row',
  },
  noneText: {
    fontSize: 16,
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    star: (username, reponame) => dispatch(star(username, reponame)),
    unstar: (username, reponame) => dispatch(unstar(username, reponame)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryItem);
