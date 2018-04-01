import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import RepositoryItem from '../listitems/RepositoryItem';
import PropTypes from 'prop-types';
import NoneItem from '../listitems/NoneItem';
import MySearchBar from '../search/MySearchBar';

class Repository extends Component {
  render() {
    const rows = this.props.repos;
    const content =
      <FlatList
        automaticallyAdjustContentInsets={false}
        data={rows}
        keyExtractor={(item, idx) => item.id}
        renderItem={({ item }) => <RepositoryItem data={item} navigator={this.props.navigator} />}
        ListEmptyComponent={<NoneItem />}
      />;
    return (
      <MySearchBar navigator={this.props.navigator} type='repositories' content={content} />
    );
  }
}

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
  navigator: PropTypes.object,
};

export default connect(mapStateToProps)(Repository);
