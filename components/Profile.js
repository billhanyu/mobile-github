import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
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
      console.log(user);
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
      <View>
        <Image source={{uri: this.state.avatarUri}} style={{width: 200, height: 200}}>
        </Image>
        <Text>name: {this.state.name}</Text>
        <Text>username: {this.state.username}</Text>
        <Text>bio: {this.state.bio}</Text>
        <Text>website: {this.state.website}</Text>
        <Text>email: {this.state.email}</Text>
        <Text>create date: {this.state.created_at}</Text>
        <TouchableOpacity onPress={()=>this.props.setTab('repo')}>
          <Text>Public Repos: {this.state.reposCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.setTab('follower')}>
          <Text># Followers: {this.state.followers}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.setTab('following')}>
          <Text># Following: {this.state.following}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Profile;