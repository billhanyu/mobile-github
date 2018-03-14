import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, ListView } from 'react-native';
import FollowingItem from '../following/FollowingItem';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Followers extends Component {
  render() {
    const rows = !this.props.followers || !this.props.followers.length ? ['None'] : this.props.followers;
    return (
      <ListView
        dataSource={ds.cloneWithRows(rows)}
        enableEmptySections={true}
        renderRow={data => <FollowingItem data={data} setTab={this.props.setTab}></FollowingItem>}
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
    followers: users[currentId] ? users[currentId].followers : [],
  };
}

export default connect(mapStateToProps)(Followers);