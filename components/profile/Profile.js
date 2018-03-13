import React, { Component } from 'react';
import { connect } from 'react-redux'
import { requestUserInfo } from '../../actions';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, ScrollView } from 'react-native';

class Profile extends Component {
  componentDidMount() {
    this.props.requestUserInfo();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 25, paddingTop: 40}}>{this.props.name}</Text>
        <Text style={{textAlign: 'center', fontSize: 20, paddingTop: 20}}>{this.props.username}</Text>
        <View style={styles.topHalf}>
          <Image key={this.props.avatarUri} source={{uri: this.props.avatarUri}} style={{width: 150, height: 150}}>
          </Image>
          <View style={styles.topHalfTexts}>
            <Text style={styles.bioTexts}>bio: {this.props.bio}</Text>
            <Text style={styles.bioTexts}>{this.props.website}</Text>
            <Text style={styles.bioTexts}>email: {this.props.email}</Text>
            <Text style={styles.bioTexts}>Since {this.props.created_at ? this.props.created_at.split('T')[0] : ''}</Text>
          </View>
        </View>
        <View style={styles.bottomHalf}>
          <Button
            onPress={()=>this.props.setTab('repo')}
            style={styles.linkTexts}
            title={`Public Repos: ${this.props.reposCount}`}
          />
          <Button
            onPress={()=>this.props.setTab('follower')}
            style={styles.linkTexts}
            title={`# Followers: ${this.props.followers}`}>
          </Button>
          <Button
            onPress={()=>this.props.setTab('following')}
            style={styles.linkTexts}
            title={`# Following: ${this.props.followingNum}`}>
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

function mapStateToProps(state) {
  const { currentId, users } = state;
  return {...users[currentId]};
}

function mapDispatchToProps(dispatch) {
  return ({
    requestUserInfo: () => dispatch(requestUserInfo()),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);