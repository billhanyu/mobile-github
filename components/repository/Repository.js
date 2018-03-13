import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import RepositoryItem from './RepositoryItem';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Repository extends Component {
  render() {
    return (
      <ListView
        dataSource={ds.cloneWithRows(this.props.repos || [])}
        enableEmptySections={true}
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

function mapStateToProps(state) {
  const { currentId, users } = state;
  return {
    repos: users[currentId] ? users[currentId].repos : [],
  };
}

export default connect(mapStateToProps)(Repository);