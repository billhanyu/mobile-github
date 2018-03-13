export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const REQUEST_REPOS = 'REQUESET_REPOS';
export const RECEIVE_REPOS = 'RECEIVE_REPOS';
export const REQUEST_FOLLOWERS = 'REQUEST_FOLLOWERS';
export const RECEIVE_FOLLOWERS = 'RECEIVE_FOLLOWERS';
export const REQUEST_FOLLOWING = 'REQUEST_FOLLOWING';
export const RECEIVE_FOLLOWING = 'RECEIVE_FOLLOWING';
export const CHANGE_USER = 'CHANGE_USER';
import axios from 'axios';

export function changeUser(id) {
  return {
    type: CHANGE_USER,
    id,
  };
}

export function requestUserInfo() {
  return (dispatch, getState) => {
    const id = getState().currentId;
    axios.get(`https://api.github.com/users/${id}`)
      .then(response => {
        console.log(response.data);
        dispatch(receiveUserInfo(id, response));
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
    axios.get(`https://api.github.com/users/${id}`)
      .then(response => {
        const repos_url = response.data.repos_url;
        return axios.get(repos_url);
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
  return {
    type: REQUEST_FOLLOWERS,
  };
}

export function receiveFollowers(json) {
  return {
    type: RECEIVE_FOLLOWERS,
    json,
  };
}

export function requestFollowing() {
  return (dispatch, getState) => {
    const state = getState();
    const id = state.currentId;
    let followingUrl = state.users[id].following_url;
    followingUrl = followingUrl.substring(0, followingUrl.length - 13);
    axios.get(followingUrl)
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
