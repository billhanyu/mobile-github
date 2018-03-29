import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListView, View, StyleSheet } from 'react-native';
import SearchItem from './SearchItem';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class SearchList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rows = !this.props.results || !this.props.results.length ? ['None'] : this.props.results;
    return (
      <ListView
        dataSource={ds.cloneWithRows(rows)}
        enableEmptySections={true}
        renderRow={data => <SearchItem data={data} />}
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

SearchList.propTypes = {
  results: PropTypes.array,
};

export default SearchList;
