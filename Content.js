import React from 'react';
import { TabBarIOS } from 'react-native';
import Profile from './components/profile/Profile';
import Repository from './components/repository/Repository';
import Followers from './components/followers/Followers';
import Following from './components/following/Following';
import Me from './components/me/Me';
import { connect } from 'react-redux';
import { loadUsers, setTab } from './actions';
import PropTypes from 'prop-types';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          icon={require('./images/profile.png')}
          selected={this.props.tab === 'profile'}
          onPress={() => this.props.setTab('profile')}
          title='Profile'
        >
          <Profile mode='current' />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./images/repo.png')}
          selected={this.props.tab === 'repo'}
          onPress={() => this.props.setTab('repo')}
          title='Repositories'
        >
          <Repository />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./images/following.png')}
          selected={this.props.tab === 'following'}
          onPress={() => this.props.setTab('following')}
          title='Following'
        >
          <Following setTab={this.props.setTab}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./images/followers.png')}
          selected={this.props.tab === 'follower'}
          onPress={() => this.props.setTab('follower')}
          title='Followers'
        >
          <Followers setTab={this.props.setTab}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./images/me.png')}
          selected={this.props.tab === 'me'}
          onPress={() => this.props.setTab('me')}
          title='Me'
        >
          <Me navigator={this.props.navigator} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

function mapStateToProps(state) {
  return {
    tab: state.tab,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadUsers: () => dispatch(loadUsers()),
    setTab: (tab) => dispatch(setTab(tab)),
  };
}

App.propTypes = {
  loadUsers: PropTypes.func,
  tab: PropTypes.string,
  setTab: PropTypes.func,
  navigator: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
