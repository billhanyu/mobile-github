import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import RepositoryItem from '../listitems/RepositoryItem';
import PropTypes from 'prop-types';
import NoneItem from '../listitems/NoneItem';

class Repository extends Component {
  render() {
    const rows = this.props.repos;
    return (
      <FlatList
        data={rows}
        keyExtractor={(item, idx) => item.name}
        renderItem={({ item }) => <RepositoryItem data={item} />}
        ListEmptyComponent={<NoneItem />}
      />
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
};

export default connect(mapStateToProps)(Repository);
