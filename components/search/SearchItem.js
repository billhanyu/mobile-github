import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { endSearch } from '../../actions';
import UserItem from '../listitems/UserItem';
import RepositoryItem from '../listitems/RepositoryItem';

class SearchItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data;
    return (
      this.props.searchType == 'users'
      ?
      <UserItem data={data} onPress={this.props.endSearch} />
      :
      <RepositoryItem data={data} />
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    endSearch: () => dispatch(endSearch()),
  };
}

SearchItem.propTypes = {
  data: PropTypes.any,
  searchType: PropTypes.oneOf(['users', 'repositories']),
  endSearch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchItem);
