import React from 'react';
import { TabBarIOS } from 'react-native';
import Profile from './components/profile/Profile';
import Repository from './components/repository/Repository';
import Followers from './components/followers/Followers';
import Following from './components/following/Following';
import Me from './components/me/Me';

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
          <Profile setTab={this.setTab} mode="current"/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./images/repo.png')}
          selected={this.state.selectedTab === 'repo'}
          onPress={() => this.setTab('repo')}
          title='Repositories'
        >
          <Repository />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./images/following.png')}
          selected={this.state.selectedTab === 'following'}
          onPress={() => this.setTab('following')}
          title='Following'
        >
          <Following setTab={this.setTab}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./images/followers.png')}
          selected={this.state.selectedTab === 'follower'}
          onPress={() => this.setTab('follower')}
          title='Followers'
        >
          <Followers setTab={this.setTab}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./images/me.png')}
          selected={this.state.selectedTab === 'me'}
          onPress={() => this.setTab('me')}
          title='Me'
        >
          <Me setTab={this.setTab} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
