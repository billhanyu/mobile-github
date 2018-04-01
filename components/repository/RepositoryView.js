import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

class RepositoryView extends Component {
  render() {
    return (
      <View style={styles.full}>
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              this.props.navigator.pop();
            }}
          >
            <Icon name='chevron-left' size={30} />
          </TouchableOpacity>
          <Text style={styles.title}>{this.props.data.name}</Text>
          <View style={{ flex: 1 }} />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    marginTop: 40,
    marginLeft: 20,
  },
  backButton: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

RepositoryView.propTypes = {
  navigator: PropTypes.object,
  data: PropTypes.object,
};

export default connect(mapStateToProps)(RepositoryView);
