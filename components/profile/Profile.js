import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestCurrentUserInfo, follow, unfollow, displayCurrent, displayLogin } from '../../actions';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, ScrollView } from 'react-native';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.onClickChangePage = this.onClickChangePage.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.state = {
      followable: false,
      unfollowable: false,
    };
  }

  componentDidMount() {
    this.props.requestCurrentUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    let followable = false;
    let unfollowable = false;
    const loginProfile = nextProps.loginProfile;
    if (nextProps.mode == 'current'
      && loginProfile
      && nextProps.currentId !== nextProps.loginId
      && nextProps.currentId !== this.props.currentId) {
      if (!loginProfile.following.filter(user => user.login == nextProps.currentId).length) {
        this.setState({
          followable: true,
          unfollowable: false,
        });
      } else {
        this.setState({
          followable: false,
          unfollowable: true,
        });
      }
    }
  }

  onClickChangePage() {
    if (this.props.mode == 'current') {
      this.props.displayCurrent();
    } else {
      this.props.displayLogin();
    }
  }

  follow(id) {
    this.setState({
      followable: false,
      unfollowable: true,
    });
    this.props.follow(id);
  }

  unfollow(id) {
    this.setState({
      followable: true,
      unfollowable: false,
    });
    this.props.unfollow(id);
  }

  render() {
    const data = this.props.mode == 'current' ? this.props.current : this.props.login;
    const {
      name,
      username,
      avatarUri,
      bio,
      website,
      email,
      createdAt,
      reposCount,
      followersNum,
      followingNum,
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
            <Text style={styles.bioTexts}>Since {createdAt ? createdAt.split('T')[0] : ''}</Text>
          </View>
        </View>
        <View style={styles.bottomHalf}>
          <Button
            onPress={()=>{
              this.onClickChangePage();
              this.props.setTab('repo');
            }}
            style={styles.linkTexts}
            title={`Public Repos: ${reposCount}`}
          />
          <Button
            onPress={() => {
              this.onClickChangePage();
              this.props.setTab('follower');
            }}
            style={styles.linkTexts}
            title={`# Followers: ${followersNum}`}>
          </Button>
          <Button
            onPress={() => {
              this.onClickChangePage();
              this.props.setTab('following');
            }}
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
          {
            this.state.followable &&
            <Button
              onPress={e=>this.follow(this.props.currentId)}
              style={styles.logout}
              title='Follow'
            />
          }
          {
            this.state.unfollowable &&
            <Button
              onPress={e=>this.unfollow(this.props.currentId)}
              style={styles.logout}
              title='Unfollow'
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
    paddingBottom: 100,
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
  },
});

function mapStateToProps(state) {
  const { currentId, users, login } = state;
  const loginId = login.id;
  let loginProfile;
  if (loginId) {
    loginProfile = users[loginId];
  }
  return {
    currentId,
    loginId,
    current: {...users[currentId]},
    login: { ...users[loginId]},
    loginProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    requestCurrentUserInfo: () => dispatch(requestCurrentUserInfo()),
    follow: (id) => dispatch(follow(id)),
    unfollow: (id) => dispatch(unfollow(id)),
    displayCurrent: () => dispatch(displayCurrent()),
    displayLogin: () => dispatch(displayLogin()),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
