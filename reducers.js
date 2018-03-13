import { combineReducers } from 'redux';
import {
  CHANGE_USER,
  REQUEST_USER,
  RECEIVE_USER,
  REQUEST_REPOS,
  RECEIVE_REPOS,
  REQUEST_FOLLOWERS,
  RECEIVE_FOLLOWERS,
  REQUEST_FOLLOWING,
  RECEIVE_FOLLOWING,
} from './actions';
import ID from './constants/id';

// id is the current viewing user's GitHub username in app
function currentId(state = ID, action) {
  switch(action.type) {
    case CHANGE_USER:
      return action.id;
    default:
      return state;
  }
}

/*
 * users: {
 *   id: data,
 *   id1: data1,
 * }
 */
function users(state = {}, action) {
  const newState = Object.assign({}, state);
  const userInfo = newState[action.id];
  switch(action.type) {
    case RECEIVE_USER:
      newState[action.id] = receiveUserInfo(action.json);
      return newState;
    case RECEIVE_REPOS:
      userInfo.repos = action.json.data;
      return newState;
    case RECEIVE_FOLLOWING:
      userInfo.following = action.json.data;
      return newState;
    default:
      return state;
  }
}

// handle user data from GitHub API
function receiveUserInfo(json) {
  const user = json.data;
  return Object.assign({}, user, {
    avatarUri: user.avatar_url,
    name: user.name,
    username: ID,
    bio: user.bio || 'N/A',
    website: user.blog,
    email: user.email || 'N/A',
    created_at: user.created_at,
    reposCount: user.public_repos,
    followers: user.followers,
    followingNum: user.following,
  });
}

const rootReducer = combineReducers({
  currentId,
  users
});

export default rootReducer;
