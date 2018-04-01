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
        automaticallyAdjustContentInsets={false}
        refreshing={this.props.loading}
        data={rows}
        keyExtractor={(item, idx) => this.props.searchType == 'users' ? item.login : item.id}
        renderItem={({ item }) => {
          return <SearchItem searchType={this.props.searchType} data={item} />;
        }}
      />
    );
  }
}

SearchList.propTypes = {
  loading: PropTypes.bool,
  results: PropTypes.array,
  searchType: PropTypes.oneOf(['users', 'repositories']),
};

export default SearchList;
