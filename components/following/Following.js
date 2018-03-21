import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ListView } from 'react-native';
import FollowingItem from './FollowingItem';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Following extends Component {
  render() {
    const rows = !this.props.following || !this.props.following.length ? ['None'] : this.props.following;
    return (
      <ListView
        dataSource={ds.cloneWithRows(rows)}
        enableEmptySections={true}
        renderRow={data => <FollowingItem data={data} setTab={this.props.setTab} />}
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
  const currentFollowing = users[currentId] ? users[currentId].following : [];
  const loginFollowing = users[login.id] ? users[login.id].following : [];
  return {
    following: display == 'current' ? currentFollowing : loginFollowing,
  };
}

export default connect(mapStateToProps)(Following);
