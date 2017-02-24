import * as UserApiUtil from '../util/user_api_util';
import {receiveAllPosts} from './post_actions';

export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';

export const receiveProfile = profile => ({
  type: RECEIVE_PROFILE,
  user: profile.user,
  posts: profile.posts,
  friendships: profile.friendships,
  friends: profile.friends
});

export const receiveSearch = search => ({
  type: RECEIVE_SEARCH,
  search: search
});

export const fetchAllUsers = () => (
  dispatch => (UserApiUtil.fetchAllUsers()
    .then(search => dispatch(receiveSearch(search))))
);

export const fetchProfile = id => (
  dispatch => (UserApiUtil.fetchProfile(id)
    .then(profile => dispatch(receiveProfile(profile))))
);

export const updateUser = user => (
  dispatch => (UserApiUtil.updateUser(user)
    .then(profile => dispatch(receiveProfile(profile))))
);
