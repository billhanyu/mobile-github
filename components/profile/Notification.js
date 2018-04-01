import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NoneItem from '../listitems/NoneItem';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      error: '',
    };
  }

  componentWillMount() {
    console.log(this.props.authEncode);
    axios.get('https://api.github.com/notifications?all=true', {
      headers: {
        'Authorization': 'Basic ' + this.props.authEncode,
      },
    })
      .then(response => {
        this.setState({
          notifications: response.data,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: 'Error getting notifications',
        });
      });
  }

  render() {
    return (
      <View style={styles.full}>
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              this.props.navigator.pop();
            }}
          >
            <Icon name='chevron-left' size={30} />
          </TouchableOpacity>
          <Text style={styles.title}>Notifications</Text>
          <View style={{ flex: 1 }} />
        </View>
        <FlatList
          automaticallyAdjustContentInsets={false}
          style={styles.list}
          data={this.state.notifications}
          keyExtractor={(item, idx) => item.id}
          renderItem={({ item }) => <Text>{item.reason}</Text>}
          ListEmptyComponent={<NoneItem />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    marginTop: 40,
    marginLeft: 20,
  },
  backButton: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
});

function mapStateToProps(state) {
  return {
    login: state.login.id,
    authEncode: state.login.authEncode,
  };
}

Notification.propTypes = {
  navigator: PropTypes.object,
  authEncode: PropTypes.string,
};

export default connect(mapStateToProps)(Notification);
