import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import auth from '../../constants/auth';
import NoneItem from '../listitems/NoneItem';

const params = { params: auth };

class RepositoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributors: [],
    };
  }

  componentWillMount() {
    const owner = this.usernameFromProps(this.props);
    const repo = this.props.data.name;
    axios.get(`https://api.github.com/repos/${owner}/${repo}/stats/contributors`, params)
      .then(response => {
        console.log(response.data);
        this.setState({
          contributors: response.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  usernameFromProps(props) {
    const data = this.props.data;
    const ownerUrl = data.owner.url;
    const arr = ownerUrl.split('/');
    return arr[arr.length - 1];
  }

  render() {
    console.log(`fff`);
    console.log(this.state.contributors);
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
          <Text style={styles.title}>{this.props.data.name}</Text>
          <View style={{ flex: 1 }} />
        </View>
        <FlatList
          automaticallyAdjustContentInsets={false}
          data={this.state.contributors}
          keyExtractor={(item, idx) => item.author.login}
          renderItem={({ item }) => <Text>{item.author.login}: {item.total}</Text>}
          ListEmptyComponent={<NoneItem />}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
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
  chart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

RepositoryView.propTypes = {
  navigator: PropTypes.object,
  data: PropTypes.object,
};

export default connect(mapStateToProps)(RepositoryView);
