import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { endSearch } from '../../actions';
import UserItem from '../listitems/UserItem';

class SearchItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data;
    return (
      <UserItem data={data} onPress={this.props.endSearch} />
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
  endSearch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchItem);
