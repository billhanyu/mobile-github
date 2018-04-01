import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import UserItem from '../listitems/UserItem';
import PropTypes from 'prop-types';
import MySearchBar from '../search/MySearchBar';
import NoneItem from '../listitems/NoneItem';

class Followers extends Component {
  render() {
    const rows = this.props.followers;
    const content =
      <FlatList
        automaticallyAdjustContentInsets={false}
        data={rows}
        keyExtractor={(item, idx) => item.login}
        renderItem={({ item }) => <UserItem data={item} />}
        ListEmptyComponent={<NoneItem />}
      />;
    return (
      <MySearchBar type='users' content={content} />
    );
  }
}

function mapStateToProps(state) {
  const { currentId, users, display, login } = state;
  const currentFollowers = users[currentId] ? users[currentId].followers : [];
  const loginFollowers = users[login.id] ? users[login.id].followers : [];
  return {
    followers: display == 'current' ? currentFollowers : loginFollowers,
  };
}

Followers.propTypes = {
  followers: PropTypes.array,
  setTab: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Followers);
