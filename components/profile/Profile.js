import React, { Component } from 'react';
import { connect } from 'react-redux'
import { requestUserInfo } from '../../actions';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, ScrollView } from 'react-native';

class Profile extends Component {
  componentDidMount() {
    this.props.requestUserInfo();
  }

  render() {
    const data = this.props.mode == "current" ? this.props.current : this.props.login;
    const {
      name,
      username,
      avatarUri,
      bio,
      website,
      email,
      created_at,
      reposCount,
      followersNum,
      followingNum
    } = data;
    return (
      <ScrollView style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 25, paddingTop: 40}}>{name}</Text>
        <Text style={{textAlign: 'center', fontSize: 20, paddingTop: 20}}>{username}</Text>
        <View style={styles.topHalf}>
          <Image key={avatarUri} source={{uri: avatarUri}} style={{width: 150, height: 150}}>
          </Image>
          <View style={styles.topHalfTexts}>
            <Text style={styles.bioTexts}>bio: {bio}</Text>
            <Text style={styles.bioTexts}>{website}</Text>
            <Text style={styles.bioTexts}>email: {email}</Text>
            <Text style={styles.bioTexts}>Since {created_at ? created_at.split('T')[0] : ''}</Text>
          </View>
        </View>
        <View style={styles.bottomHalf}>
          <Button
            onPress={()=>this.props.setTab('repo')}
            style={styles.linkTexts}
            title={`Public Repos: ${reposCount}`}
          />
          <Button
            onPress={()=>this.props.setTab('follower')}
            style={styles.linkTexts}
            title={`# Followers: ${followersNum}`}>
          </Button>
          <Button
            onPress={()=>this.props.setTab('following')}
            style={styles.linkTexts}
            title={`# Following: ${followingNum}`}>
          </Button>
          {
            this.props.logout &&
            <Button
              onPress={this.props.logout}
              style={styles.logout}
              title='Log Out'
            />
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
  },
  topHalf: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
  },
  bottomHalf: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 100
  },
  topHalfTexts: {
    paddingLeft: 40,
    flex: 1,
    flexDirection: 'column',
  },
  bioTexts: {
    fontSize: 17,
    paddingTop: 5,
  },
  linkTexts: {
    fontSize: 17,
    paddingTop: 10,
    textAlign: 'center',
  },
  logout: {
    textAlign: 'center',
    paddingTop: 30,
    fontSize: 17,
  }
});

function mapStateToProps(state) {
  const { currentId, users, login } = state;
  return {
    current: {...users[currentId]},
    login: {...login.data},
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    requestUserInfo: () => dispatch(requestUserInfo()),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);