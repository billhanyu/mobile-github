import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, ScrollView } from 'react-native';
import ID from '../constants/id';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUri: 'https://cdn4.iconfinder.com/data/icons/eldorado-user/40/user-256.png',
      name: 'John Doe',
      username: 'xuanyu',
      bio: '',
      website: '',
      email: '',
      reposCount: 0,
      followers: 0,
      following: 0,
      created_at: '',
    };
  }

  componentDidMount() {
    axios.get(`https://api.github.com/users/${ID}`)
    .then(response => {
      const user = response.data;
      this.setState({
        avatarUri: user.avatar_url,
        name: user.name,
        username: ID,
        bio: user.bio || 'N/A',
        website: user.blog,
        email: user.email || 'N/A',
        created_at: user.created_at,
        reposCount: user.public_repos,
        followers: user.followers,
        following: user.following,
      });
      // this.getFollowers(user.followers_url);
      // this.getFollowing(user.following_url);
    })
    .catch(err => console.log(err));
  }

  getFollowers(url) {
    axios.get(url)
    .then(response => {
      console.log(response.data);
    })
    .catch(err => console.error(err));
  }

  getFollowing(url) {
    axios.get(url)
    .then(response => {
      console.log(response.data);
    })
    .catch(err => console.error(err));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 25, paddingTop: 40}}>{this.state.name}</Text>
        <Text style={{textAlign: 'center', fontSize: 20, paddingTop: 20}}>{this.state.username}</Text>
        <View style={styles.topHalf}>
          <Image source={{uri: this.state.avatarUri}} style={{width: 150, height: 150}}>
          </Image>
          <View style={styles.topHalfTexts}>
            <Text style={styles.bioTexts}>bio: {this.state.bio}</Text>
            <Text style={styles.bioTexts}>{this.state.website}</Text>
            <Text style={styles.bioTexts}>email: {this.state.email}</Text>
            <Text style={styles.bioTexts}>Since {this.state.created_at.split('T')[0]}</Text>
          </View>
        </View>
        <View style={styles.bottomHalf}>
          <Button
            onPress={()=>this.props.setTab('repo')}
            style={styles.linkTexts}
            title={`Public Repos: ${this.state.reposCount}`}
          />
          <Button
            onPress={()=>this.props.setTab('follower')}
            style={styles.linkTexts}
            title={`# Followers: ${this.state.followers}`}>
          </Button>
          <Button
            onPress={()=>this.props.setTab('following')}
            style={styles.linkTexts}
            title={`# Following: ${this.state.following}`}>
          </Button>
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
  }
});

export default Profile;