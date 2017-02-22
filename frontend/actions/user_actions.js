import * as UserApiUtil from '../util/user_api_util';
import {receiveAllPosts} from './post_actions';

export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const receiveProfile = profile => ({
  type: RECEIVE_PROFILE,
  user: profile.user,
  posts: profile.posts,
  friendships: profile.friendships
});

export const fetchProfile = id =>(
  dispatch => (UserApiUtil.fetchProfile(id)
    .then(profile => dispatch(receiveProfile(profile))))
);

export const updateUser = user =>(
  dispatch => (UserApiUtil.updateUser(user)
    .then(profile => dispatch(receiveProfile(profile))))
);
