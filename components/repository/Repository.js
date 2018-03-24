import React, { Component } from 'react';
import { View, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import RepositoryItem from './RepositoryItem';
import PropTypes from 'prop-types';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Repository extends Component {
  render() {
    const rows = !this.props.repos || !this.props.repos.length ? ['None'] : this.props.repos;
    return (
      <ListView
        dataSource={ds.cloneWithRows(rows)}
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
  const { currentId, users, display, login } = state;
  const currentRepos = users[currentId] ? users[currentId].repos : [];
  const loginRepos = users[login.id] ? users[login.id].repos : [];
  return {
    repos: display == 'current' ? currentRepos : loginRepos,
  };
}

Repository.propTypes = {
  repos: PropTypes.array,
};

export default connect(mapStateToProps)(Repository);
