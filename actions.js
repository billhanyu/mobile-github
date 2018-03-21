import axios from 'axios';
import auth from './constants/auth';
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
export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const DISPLAY_CURRENT = 'DISPLAY_CURRENT';
export const DISPLAY_LOGIN = 'DISPLAY_LOGIN';
export const STAR_REPO = 'STAR_REPO';
export const UNSTAR_REPO = 'UNSTAR_REPO';

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
