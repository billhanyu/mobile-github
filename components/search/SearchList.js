import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import SearchItem from './SearchItem';

class SearchList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rows = this.props.results;
    return (
      <FlatList
        data={rows}
        keyExtractor={(item, idx) => item.login}
        renderItem={({ item }) => {
          return <SearchItem data={item} />;
        }}
      />
    );
  }
}

SearchList.propTypes = {
  results: PropTypes.array,
  searchType: PropTypes.oneOf(['users', 'repositories']),
};

export default SearchList;
