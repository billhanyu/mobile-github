import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RepositoryView extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.setModalVisible(false)}
        >
        <View style={styles.full}>
          <Text>{this.props.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const styles = StyleSheet.create({
  full: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

RepositoryView.propTypes = {
  setModalVisible: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(RepositoryView);
