import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import UserItem from '../listitems/UserItem';
import PropTypes from 'prop-types';
import MySearchBar from '../search/MySearchBar';
import NoneItem from '../listitems/NoneItem';

class Following extends Component {
  render() {
    const rows = this.props.following;
    const content =
      <FlatList
        automaticallyAdjustContentInsets={false}
        data={rows}
        keyExtractor={(item, idx) => item.login}
        renderItem={({item}) => <UserItem data={item} />}
        ListEmptyComponent={<NoneItem />}
      />;
    return (
      <MySearchBar type='users' content={content} />
    );
  }
}

function mapStateToProps(state) {
  const { currentId, users, display, login } = state;
  const currentFollowing = users[currentId] ? users[currentId].following : [];
  const loginFollowing = users[login.id] ? users[login.id].following : [];
  return {
    following: display == 'current' ? currentFollowing : loginFollowing,
  };
}

Following.propTypes = {
  following: PropTypes.array,
  setTab: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Following);
