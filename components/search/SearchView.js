import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SearchList from './SearchList';
import PropTypes from 'prop-types';

class SearchView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.full}>
        {
          this.props.error !== '' &&
          <Text style={styles.errorText}>fff</Text>
        }
        {
          this.props.ready &&
          <SearchList {...this.props} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  errorText: {
    color: 'red',
  },
});

SearchView.propTypes = {
  error: PropTypes.string,
  ready: PropTypes.bool,
};

export default SearchView;
