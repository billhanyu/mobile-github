import axios from 'axios';
import auth from './constants/auth';
import qs from 'querystring';
import { Buffer } from 'buffer';

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

const params = { params: auth };

export function changeUser(id) {
  return {
    type: CHANGE_USER,
    id,
  };
}

export function requestUserInfo() {
  return (dispatch, getState) => {
    const id = getState().currentId;
    axios.get(`https://api.github.com/users/${id}`, params)
      .then(response => {
        dispatch(receiveUserInfo(id, response));
        dispatch(requestRepos());
        dispatch(requestFollowers());
        dispatch(requestFollowing());
      })
      .catch(err => console.log(err));
  };
}

export function receiveUserInfo(id, json) {
  return {
    type: RECEIVE_USER,
    id,
    json,
  };
}

export function requestRepos() {
  return (dispatch, getState) => {
    const id = getState().currentId;
    axios.get(`https://api.github.com/users/${id}`, params)
      .then(response => {
        const repos_url = response.data.repos_url;
        return axios.get(repos_url, params);
      })
      .then(response => {
        dispatch(receiveRepos(id, response));
      })
      .catch(err => console.error(err));
  }
}

export function receiveRepos(id, json) {
  return {
    type: RECEIVE_REPOS,
    id,
    json,
  };
}

export function requestFollowers() {
  return (dispatch, getState) => {
    const state = getState();
    const id = state.currentId;
    let followersUrl = state.users[id].followers_url;
    axios.get(followersUrl, params)
      .then(response => {
        dispatch(receiveFollowers(id, response));
      })
      .catch(err => console.error(err));
  }
}

export function receiveFollowers(id, json) {
  return {
    type: RECEIVE_FOLLOWERS,
    id,
    json,
  };
}

export function requestFollowing() {
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
  }
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
      headers: { Authorization: "Basic " + authEncode}
    })
    .then(response => {
      console.log(response.data);
      dispatch(changeUser(username));
      dispatch(requestUserInfo());
      dispatch(receiveLogin(response));
    })
    .catch(err => {
      dispatch(loginError(err));
    });
  }
}

export function receiveLogin(json) {
  return {
    type: RECEIVE_LOGIN,
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
