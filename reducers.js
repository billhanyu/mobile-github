import { combineReducers } from 'redux';
import {
  CHANGE_USER,
  RECEIVE_USER,
  RECEIVE_REPOS,
  RECEIVE_FOLLOWERS,
  RECEIVE_FOLLOWING,
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  LOGIN_ERROR,
  LOGOUT,
  DISPLAY_CURRENT,
  DISPLAY_LOGIN,
  FOLLOW,
  UNFOLLOW,
  LOAD_USERS,
  SEARCH_BEGIN,
  SEARCH_RESULTS,
  SEARCH_ERROR,
  SEARCH_CHANGE_SORT,
  SEARCHING_START,
  SEARCHING_END,
  SET_TAB,
} from './actions';
import ID from './constants/id';
import { findIndexInArrayWithAttribute } from './common/helper';

// id is the current viewing user's GitHub username in app
function currentId(state = ID, action) {
  switch (action.type) {
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
  newState[action.id] = Object.assign({}, newState[action.id]);
  const userInfo = newState[action.id];
  let index;
  switch (action.type) {
    case RECEIVE_USER:
      const info = receiveUserInfo(action.json);
      newState[action.id] = info;
      if (action.loginId) {
        const following = newState[action.loginId].following;
        index = findIndexInArrayWithAttribute(following, 'login', action.id);
        if (index > -1) {
          following[index] = info;
        }
        newState[action.loginId].following = following.slice();
      }
      return newState;
    case RECEIVE_LOGIN:
      newState[action.id] = receiveUserInfo(action.json);
      return newState;
    case RECEIVE_REPOS:
      userInfo.repos = action.json.data;
      return newState;
    case RECEIVE_FOLLOWING:
      userInfo.following = action.json.data;
      return newState;
    case RECEIVE_FOLLOWERS:
      userInfo.followers = action.json.data;
      return newState;
    case FOLLOW:
      let following = newState[action.login].following.slice();
      following.push({login: action.id});
      newState[action.login].following = following;
      newState[action.login].followingNum++;
      if (newState[action.id]) {
        newState[action.id].followersNum++;
      }
      return newState;
    case UNFOLLOW:
      following = newState[action.login].following.slice();
      index = findIndexInArrayWithAttribute(following, 'login', action.id);
      if (index > -1) {
        following.splice(index, 1);
        newState[action.login].following = following;
      }
      newState[action.login].followingNum--;
      if (newState[action.id]) {
        newState[action.id].followersNum--;
      }
      return newState;
    case LOAD_USERS:
      return action.data;
    default:
      return state;
  }
}

/* login: {
 *   id,
 *   authEncode,
 *   error,
 * }
 */
function login(state = {}, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case REQUEST_LOGIN:
      newState.authEncode = action.authEncode;
      newState.error = null;
      return newState;
    case RECEIVE_LOGIN:
      newState.id = action.id;
      return newState;
    case LOGIN_ERROR:
      newState.error = action.error;
      return newState;
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

function display(state='current', action) {
  switch (action.type) {
    case DISPLAY_CURRENT:
      return 'current';
    case DISPLAY_LOGIN:
      return 'login';
    default:
      return state;
  }
}

function search(state={
  searching: false,
  searchType: 'users',
  loading: false,
  sort: 'followers',
  error: '',
  ready: false,
  results: [],
}, action) {
  switch (action.type) {
    case SEARCH_BEGIN:
      return Object.assign({}, state, {
        searchType: action.searchType,
        loading: true,
      });
    case SEARCH_RESULTS:
      return Object.assign({}, state, {
        loading: false,
        results: action.data.items,
        ready: true,
      });
    case SEARCH_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.message,
      });
    case SEARCH_CHANGE_SORT:
      return Object.assign({}, state, {
        sort: action.sort,
      });
    case SEARCHING_START:
      return Object.assign({}, state, {
        searching: true,
      });
    case SEARCHING_END:
      return Object.assign({}, state, {
        searching: false,
      });
    default:
      return state;
  }
}

function tab(state='profile', action) {
  switch (action.type) {
    case SET_TAB:
      return action.tab;
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
    username: user.login,
    bio: user.bio || 'N/A',
    website: user.blog,
    email: user.email || 'N/A',
    created_at: user.created_at,
    reposCount: user.public_repos,
    followersNum: user.followers,
    followingNum: user.following,
    following: [],
    followers: [],
    repos: [],
  });
}

const rootReducer = combineReducers({
  currentId,
  login,
  users,
  display,
  search,
  tab,
});

export default rootReducer;
