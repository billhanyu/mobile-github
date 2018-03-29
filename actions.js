import axios from 'axios';
import auth from './constants/auth';
import { Buffer } from 'buffer';
import { AsyncStorage } from 'react-native';

export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const REQUEST_REPOS = 'REQUESET_REPOS';
export const RECEIVE_REPOS = 'RECEIVE_REPOS';
export const REQUEST_FOLLOWERS = 'REQUEST_FOLLOWERS';
export const RECEIVE_FOLLOWERS = 'RECEIVE_FOLLOWERS';
export const REQUEST_FOLLOWING = 'REQUEST_FOLLOWING';
export const RECEIVE_FOLLOWING = 'RECEIVE_FOLLOWING';
export const CHANGE_USER = 'CHANGE_USER';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const DISPLAY_CURRENT = 'DISPLAY_CURRENT';
export const DISPLAY_LOGIN = 'DISPLAY_LOGIN';
export const LOAD_USERS = 'LOAD_USERS';
export const SAVE_USERS = 'SAVE_USERS';
export const SEARCH_BEGIN = 'SEARCH_BEGIN';
export const SEARCH_RESULTS = 'SEARCH_RESULTS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_CHANGE_SORT = 'SEARCH_CHANGE_SORT';
export const SEARCHING_START = 'SEARCHING_START';
export const SEARCHING_END = 'SEARCHING_END';
export const SET_TAB = 'SET_TAB';

const params = { params: auth };

export function changeUser(id) {
  return {
    type: CHANGE_USER,
    id,
  };
}

function requestUserInfo(id, loginId) {
  return (dispatch, getState) => {
    axios.get(`https://api.github.com/users/${id}`, params)
      .then(response => {
        dispatch(receiveUserInfo(id, response, loginId));
        dispatch(requestRepos(id));
        dispatch(requestFollowers(id));
        dispatch(requestFollowing(id));
      })
      .catch(err => console.log(err));
  };
}

export function requestCurrentUserInfo() {
  return (dispatch, getState) => {
    const id = getState().currentId;
    dispatch(requestUserInfo(id));
  };
}

export function receiveUserInfo(id, json, loginId) {
  return {
    type: RECEIVE_USER,
    id,
    json,
    loginId,
  };
}

export function requestRepos(id) {
  return (dispatch, getState) => {
    axios.get(`https://api.github.com/users/${id}`, params)
      .then(response => {
        const reposUrl = response.data.repos_url;
        return axios.get(reposUrl, params);
      })
      .then(response => {
        dispatch(receiveRepos(id, response));
      })
      .catch(err => console.error(err));
  };
}

export function receiveRepos(id, json) {
  return {
    type: RECEIVE_REPOS,
    id,
    json,
  };
}

export function requestFollowers(id) {
  return (dispatch, getState) => {
    const state = getState();
    let followersUrl = state.users[id].followers_url;
    axios.get(followersUrl, params)
      .then(response => {
        dispatch(receiveFollowers(id, response));
      })
      .catch(err => console.error(err));
  };
}

export function receiveFollowers(id, json) {
  return {
    type: RECEIVE_FOLLOWERS,
    id,
    json,
  };
}

export function requestFollowing(id) {
  return (dispatch, getState) => {
    const state = getState();
    const id = state.currentId;
    let followingUrl = state.users[id].following_url;
    followingUrl = followingUrl.substring(0, followingUrl.length - 13);
    axios.get(followingUrl, params)
      .then(response => {
        dispatch(receiveFollowing(id, response));
      })
      .catch(err => console.error(err));
  };
}

export function receiveFollowing(id, json) {
  return {
    type: RECEIVE_FOLLOWING,
    id,
    json,
  };
}

export function requestLogin(username, password) {
  return (dispatch, getState) => {
    const authEncode = Buffer.from(`${username}:${password}`).toString('base64');
    dispatch({
      type: REQUEST_LOGIN,
      authEncode,
    });
    axios.get('https://api.github.com/user', {
      headers: { Authorization: 'Basic ' + authEncode},
    })
    .then(response => {
      dispatch(changeUser(username));
      dispatch(requestUserInfo(username));
      dispatch(receiveLogin(username, response));
    })
    .catch(err => {
      dispatch(loginError(err));
    });
  };
}

export function receiveLogin(id, json) {
  return {
    type: RECEIVE_LOGIN,
    id,
    json,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function follow(id) {
  return (dispatch, getState) => {
    const state = getState();
    const authEncode = state.login.authEncode;
    axios.put(`https://api.github.com/user/following/${id}`, '', {
      headers: {
        'Authorization': 'Basic ' + authEncode,
        'Content-Length': 0,
      },
    })
    .then(response => {
      dispatch({
        type: FOLLOW,
        id,
        login: state.login.id,
      });
    })
    .then(() => {
      dispatch(requestUserInfo(id, state.login.id));
    })
    .catch(err => {
      console.log(err.response);
    });
  };
}

export function unfollow(id) {
  return (dispatch, getState) => {
    const state = getState();
    const authEncode = state.login.authEncode;
    axios.delete(`https://api.github.com/user/following/${id}`, {
      headers: {
        Authorization: 'Basic ' + authEncode,
      },
    })
      .then(response => {
        dispatch({
          type: UNFOLLOW,
          id,
          login: state.login.id,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function displayCurrent() {
  return {
    type: DISPLAY_CURRENT,
  };
}

export function displayLogin() {
  return {
    type: DISPLAY_LOGIN,
  };
}

export function loadUsers() {
  return (dispatch, getState) => {
    AsyncStorage.getItem('@MySuperStore:users')
      .then(value => {
        if (value !== null) {
          dispatch({
            type: LOAD_USERS,
            data: JSON.parse(value),
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function saveUsers() {
  return (dispatch, getState) => {
    const users = getState().users;
    AsyncStorage.setItem('@MySuperStore:users', JSON.stringify(users))
      .then(result => {
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function beginSearch(searchType, q, sort) {
  return (dispatch, getState) => {
    dispatch({
      type: SEARCH_BEGIN,
      searchType,
    });
    const state = getState();
    const authEncode = state.login.authEncode;
    axios.get(`https://api.github.com/search/${searchType}`, {
      params: {
        q,
        sort,
      },
      headers: {
        Authorization: 'Basic ' + authEncode,
      },
    })
      .then(response => {
        dispatch({
          type: SEARCH_RESULTS,
          data: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: SEARCH_ERROR,
          message: 'Error searching',
        });
      });
  };
}

export function changeSearchSort(sort) {
  return {
    type: SEARCH_CHANGE_SORT,
    sort,
  };
}

export function startSearch() {
  return {
    type: SEARCHING_START,
  };
}

export function endSearch() {
  return {
    type: SEARCHING_END,
  };
}

export function setTab(tab) {
  return {
    type: SET_TAB,
    tab,
  };
}
