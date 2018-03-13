import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestFollowing } from '../../actions';
import { View, StyleSheet, Text, ListView } from 'react-native';
import FollowingItem from './FollowingItem';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Following extends Component {
  componentDidMount() {
    this.props.requestFollowing();
  }
  
  render() {
    return (
      <ListView
        dataSource={ds.cloneWithRows(this.props.following || [])}
        enableEmptySections={true}
        renderRow={data => <FollowingItem data={data}></FollowingItem>}
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
    following: users[currentId].following,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestFollowing: () => dispatch(requestFollowing()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Following);