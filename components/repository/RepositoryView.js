import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import auth from '../../constants/auth';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryScatter } from 'victory-native';

const params = { params: auth };

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class RepositoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributors: [],
      commits: [],
      contributorMessage: '',
      commitMessage: '',
    };
  }

  componentWillMount() {
    const owner = this.usernameFromProps(this.props);
    const repo = this.props.data.name;
    axios.get(`https://api.github.com/repos/${owner}/${repo}/stats/contributors`, params)
      .then(response => {
        if (response.status == 200) {
          const contributors = response.data.map(entry => {
            return {
              user: entry.author.login,
              total: entry.total,
            };
          });
          contributors.sort((a, b) => b.total - a.total);
          this.setState({
            contributors: contributors.slice(0, contributors.length > 5 ? 5 : contributors.length),
          });
        } else {
          this.setState({
            contributorMessage: 'Loading, come back later?',
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    axios.get(`https://api.github.com/repos/${owner}/${repo}/stats/punch_card`, params)
      .then(response => {
        if (response.status == 200) {
          let commits = response.data.map(entry => {
            return {
              x: WEEKDAYS[entry[0]],
              y: entry[1],
              amount: entry[2],
            };
          });
          commits = commits.filter(commit => commit.amount !== 0);
          this.setState({
            commits,
          });
        } else {
          this.setState({
            commitMessage: 'Loading, come back later?',
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  usernameFromProps(props) {
    const data = this.props.data;
    const ownerUrl = data.owner.url;
    const arr = ownerUrl.split('/');
    return arr[arr.length - 1];
  }

  render() {
    return (
      <View style={styles.full}>
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              this.props.navigator.pop();
            }}
          >
            <Icon name='chevron-left' size={30} />
          </TouchableOpacity>
          <Text style={styles.title}>{this.props.data.name}</Text>
          <View style={{ flex: 1 }} />
        </View>
        <ScrollView
          automaticallyAdjustContentInsets={false}>
          <View style={styles.chart}>
            <Text style={styles.contributorText}>Top Contributors by Commits</Text>
            {
              this.state.contributorMessage
              ?
                <Text>{this.state.contributorMessage}</Text>
              :
                <VictoryChart theme={VictoryTheme.material}>
                  <VictoryBar data={this.state.contributors} x="user" y="total" />
                </VictoryChart>
            }
            <Text style={styles.contributorText}>Commit Times</Text>
            {
              this.state.commitMessage
                ?
                <Text>{this.state.commitMessage}</Text>
                :
                <VictoryChart theme={VictoryTheme.material}>
                  <VictoryScatter
                    style={{ data: { fill: '#5779af' } }}
                    bubbleProperty='amount'
                    maxBubbleSize={25}
                    minBubbleSize={0}
                    data={this.state.commits}
                  />
                </VictoryChart>
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    marginTop: 40,
    marginLeft: 20,
  },
  backButton: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  chart: {
    flex: 1,
    alignItems: 'center',
  },
  contributorText: {
    padding: 20,
    fontSize: 20,
    fontWeight: '500',
  },
});

RepositoryView.propTypes = {
  navigator: PropTypes.object,
  data: PropTypes.object,
};

export default connect(mapStateToProps)(RepositoryView);
