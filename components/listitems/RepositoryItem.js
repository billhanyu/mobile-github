import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import RepositoryView from '../repository/RepositoryView';

class RepositoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starred: 'fuck',
    };
    this.star = this.star.bind(this);
    this.unstar = this.unstar.bind(this);
  }

  // get the username from props, might return undefined bc of 'None'
  usernameFromProps(props) {
    const data = this.props.data;
    const ownerUrl = data.owner.url;
    const arr = ownerUrl.split('/');
    return arr[arr.length - 1];
  }

  componentDidMount() {
    this.checkStar(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.checkStar(newProps);
  }

  checkStar(props) {
    let ownerUsername;
    if (props.login) {
      ownerUsername = this.usernameFromProps(props);
      if (ownerUsername) {
        axios.get(`https://api.github.com/user/starred/${ownerUsername}/${props.data.name}`, {
          headers: {
            'Authorization': 'Basic ' + props.authEncode,
            'Content-Length': 0,
          },
        })
          .then(response => {
            this.setState({
              starred: true,
            });
          })
          .catch(err => {
            this.setState({
              starred: false,
            });
          });
      };
    }
  }

  star(username, reponame) {
    this.setState({
      starred: true,
    });
    axios.put(`https://api.github.com/user/starred/${username}/${reponame}`, '', {
      headers: {
        'Authorization': 'Basic ' + this.props.authEncode,
        'Content-Length': 0,
      },
    })
      .catch(err => {
        this.setState({
          starred: false,
        });
      });
  }

  unstar(username, reponame) {
    this.setState({
      starred: false,
    });
    axios.delete(`https://api.github.com/user/starred/${username}/${reponame}`, {
      headers: {
        'Authorization': 'Basic ' + this.props.authEncode,
        'Content-Length': 0,
      },
    })
      .catch(err => {
        this.setState({
          starred: true,
        });
      });
  }

  render() {
    const data = this.props.data;
    const ownerUsername = this.usernameFromProps(this.props);
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigator.push({
            title: '',
            component: RepositoryView,
            passProps: { data },
          });
        }}
      >
        <View style={styles.horizontal}>
          {this.state.starred == false &&
            <TouchableOpacity
              onPress={() => this.star(data.owner.login, data.name)}
            >
              <Icon name='star-o' size={30} />
            </TouchableOpacity>
          }
          {this.state.starred == true &&
            <TouchableOpacity
              onPress={() => this.unstar(data.owner.login, data.name)}
            >
              <Icon name='star' size={30} />
            </TouchableOpacity>
          }
          <View style={styles.container}>
            <View style={styles.gen}>
              <Text style={styles.repoName}>{data.name}</Text>
              <Text style={styles.text}>{ownerUsername}</Text>
            </View>
            <Text style={styles.text}>{data.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
  },
  container: {
    flex: 1,
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
});

function mapStateToProps(state) {
  return {
    login: state.login.id,
    authEncode: state.login.authEncode,
  };
}

RepositoryItem.propTypes = {
  authEncode: PropTypes.string,
  data: PropTypes.any,
  navigator: PropTypes.object,
};

export default connect(mapStateToProps)(RepositoryItem);
