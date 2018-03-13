import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { changeUser, requestUserInfo } from '../../actions';

class FollowingItem extends Component {
  render() {
    const data = this.props.data;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.changeUser(data.login);
          this.props.setTab('profile');
          this.props.requestUserInfo();
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
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeUser: (id) => dispatch(changeUser(id)),
    requestUserInfo: () => dispatch(requestUserInfo()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowingItem);