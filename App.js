import React from 'react';
import { StyleSheet, Text, View, TabBarIOS } from 'react-native';
import Profile from './components/Profile';
import Repository from './components/Repository';
import Followers from './components/Followers';
import Following from './components/Following';
import ID from './constants/id';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'profile',
    };
    this.setTab = this.setTab.bind(this);
  }

  setTab(tabId) {
    this.setState({
      selectedTab: tabId,
    });
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          icon={require('./images/profile.png')}
          selected={this.state.selectedTab === 'profile'}
          onPress={() => this.setTab('profile')}
          title='Profile'
        >
          <Profile setTab={this.setTab}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'repo'}
          onPress={() => this.setTab('repo')}
          title='Repositories'
        >
          <Repository id={ID} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'following'}
          onPress={() => this.setTab('following')}
          title='Following'
        >
          <Following />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'follower'}
          onPress={() => this.setTab('follower')}
          title='Followers'
        >
          <Followers />
        </TabBarIOS.Item>
      </TabBarIOS>
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
