import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { changeUser, requestCurrentUserInfo } from '../../actions';

class FollowingItem extends Component {
  render() {
    const data = this.props.data;
    return (
      data == 'None'
      ?
      <View style = { styles.container } >
        <Text style={styles.noneText}>None</Text>
      </View >
      :
      <TouchableOpacity
        onPress={() => {
          this.props.changeUser(data.login);
          this.props.setTab('profile');
          this.props.requestCurrentUserInfo();
        }}
      >
        <View style={styles.container}>
          <Image key={data.avatar_url} source={{ uri: data.avatar_url }} style={{ width: 80, height: 80 }}>
          </Image>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{data.login}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
  },
  text: {
    fontSize: 16,
  },
  noneText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeUser: (id) => dispatch(changeUser(id)),
    requestCurrentUserInfo: () => dispatch(requestCurrentUserInfo()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowingItem);
