import React, { Component } from 'react';
import { Text, View, StyleSheet, Linking, TouchableOpacity, Button } from 'react-native';
import { star, unstar, checkStar } from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RepositoryItem extends Component {
  // get the username from props, might return undefined bc of 'None'
  usernameFromProps(props) {
    let ownerUrl;
    let arr;
    let ownerUsername;
    if (data !== 'None') {
      ownerUrl = data.owner.url;
      arr = ownerUrl.split('/');
      ownerUsername = arr[arr.length - 1];
    }
    return ownerUsername;
  }

  componentWillReceiveProps(newProps) {
    let ownerUsername;
    if (newProps.login) {
      if (ownerUsername = this.username(newProps)) {
        this.props.checkStar(ownerUsername, newProps.data.name);
      }
    }
  }

  render() {
    const data = this.props.data;
    const ownerUsername = this.usernameFromProps(this.props);
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
          {data.starred == false &&
            <Button
              onPress={()=>this.props.star(data.owner.login, data.name)}
              title='star'
            />
          }
          {data.starred == true &&
            <Button
              onPress={()=>this.props.unstar(data.owner.login, data.name)}
              title='unstar'
            />
          }
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
  return {
    login: state.login.id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    star: (username, reponame) => dispatch(star(username, reponame)),
    unstar: (username, reponame) => dispatch(unstar(username, reponame)),
    checkStar: (username, reponame) => dispatch(checkStar(username, reponame)),
  };
}

RepositoryItem.propTypes = {
  data: PropTypes.object,
  star: PropTypes.func,
  unstar: PropTypes.func,
  checkStar: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryItem);
