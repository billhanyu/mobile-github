import React, { Component } from 'react';
import SearchBar from 'react-native-search-bar';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { beginSearch, startSearch, endSearch } from '../../actions';
import SearchView from './SearchView';

class MySearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onSearchButtonPress = this.onSearchButtonPress.bind(this);
    this.onCancelButtonPress = this.onCancelButtonPress.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.searching) {
      this.searchBar.unFocus();
    }
  }

  onFocus() {
    this.props.startSearch();
  }

  onChangeText(text) {
    this.setState({
      q: text,
    });
  }

  onSearchButtonPress() {
    this.props.beginSearch(this.props.type, this.state.q, this.props.sort);
  }

  onCancelButtonPress() {
    this.props.endSearch();
  }

  render() {
    return (
      <View style={styles.full}>
        <SearchBar
          ref={bar => {
            this.searchBar = bar;
          }}
          placeholder='Search'
          onChangeText={this.onChangeText}
          onSearchButtonPress={this.onSearchButtonPress}
          onCancelButtonPress={this.onCancelButtonPress}
          onFocus={this.onFocus}
        />
        {
          !this.props.searching &&
          this.props.content
        }
        {
          this.props.searching &&
          <SearchView {...this.props} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
    paddingTop: 40,
  },
});

function mapStateToProps(state) {
  return {...state.search};
}

function mapDispatchToProps(dispatch) {
  return {
    startSearch: () => dispatch(startSearch()),
    endSearch: () => dispatch(endSearch()),
    beginSearch: (type, q, sort) => dispatch(beginSearch(type, q, sort)),
  };
}

MySearchBar.propTypes = {
  type: PropTypes.oneOf(['users', 'repositories']),
  beginSearch: PropTypes.func,
  startSearch: PropTypes.func,
  endSearch: PropTypes.func,
  sort: PropTypes.string,
  searching: PropTypes.bool,
  content: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(MySearchBar);
