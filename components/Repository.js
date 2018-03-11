import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet } from 'react-native';
import axios from 'axios';
import RepositoryItem from './RepositoryItem';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Repository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: ds.cloneWithRows([]),
    };
  }
  
  componentDidMount() {
    const id = this.props.id;
    axios.get(`https://api.github.com/users/${id}`)
    .then(response => {
      const repos_url = response.data.repos_url;
      return axios.get(repos_url);
    })
    .then(response => {
      console.log(response.data);
      this.setState({
        repos: ds.cloneWithRows(response.data),
      });
    })
    .catch(err => console.error(err));
  }

  render() {
    return (
      <ListView
        dataSource={this.state.repos}
        renderRow={data => <RepositoryItem data={data}></RepositoryItem>}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      >
      </ListView>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

export default Repository;