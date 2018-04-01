import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestCurrentUserInfo, follow, unfollow, displayCurrent, displayLogin, saveUsers, setTab } from '../../actions';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import MySearchBar from '../search/MySearchBar';
import Notification from './Notification';

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

    if (!loginProfile) {
      this.setState({
        followable: false,
        unfollowable: false,
      });
    }

    this.props.saveUsers();
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
      reposCount,
      followersNum,
      followingNum,
    } = data;

    const createdAt = data.created_at;

    const content =
      <ScrollView style={styles.container} automaticallyAdjustContentInsets={false}>
        <Text style={{ textAlign: 'center', fontSize: 25, paddingTop: 40 }}>{name}</Text>
        <Text style={{ textAlign: 'center', fontSize: 20, paddingTop: 20 }}>{username}</Text>
        <View style={styles.topHalf}>
          <Image key={avatarUri} source={{ uri: avatarUri }} style={{ width: 150, height: 150 }}>
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
            onPress={() => {
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
            this.props.mode == 'me' &&
            <Button
              onPress={() => {
                this.props.navigator.push({
                  title: 'Scene ',
                  component: Notification,
                });
              }}
              style={styles.logout}
              title='Notifications'
            />
          }
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
              onPress={e => this.follow(this.props.currentId)}
              style={styles.logout}
              title='Follow'
            />
          }
          {
            this.state.unfollowable &&
            <Button
              onPress={e => this.unfollow(this.props.currentId)}
              style={styles.logout}
              title='Unfollow'
            />
          }
        </View>
      </ScrollView>;

    return this.props.mode == 'current'
      ?
      <MySearchBar type='users' content={content} />
      :
      content;
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
  const { currentId, users, login, search } = state;
  const loginId = login.id;
  let loginProfile;
  if (loginId) {
    loginProfile = users[loginId];
  }
  return {
    currentId,
    loginId,
    current: { ...users[currentId] },
    login: { ...users[loginId] },
    loginProfile,
    search,
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    requestCurrentUserInfo: () => dispatch(requestCurrentUserInfo()),
    follow: (id) => dispatch(follow(id)),
    unfollow: (id) => dispatch(unfollow(id)),
    displayCurrent: () => dispatch(displayCurrent()),
    displayLogin: () => dispatch(displayLogin()),
    saveUsers: () => dispatch(saveUsers()),
    setTab: (tab) => dispatch(setTab(tab)),
  });
}

Profile.propTypes = {
  requestCurrentUserInfo: PropTypes.func.isRequired,
  loginProfile: PropTypes.object,
  displayCurrent: PropTypes.func.isRequired,
  displayLogin: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['current', 'me']),
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  logout: PropTypes.func,
  current: PropTypes.object,
  login: PropTypes.object,
  currentId: PropTypes.string,
  loginId: PropTypes.string,
  setTab: PropTypes.func.isRequired,
  saveUsers: PropTypes.func.isRequired,
  navigator: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
