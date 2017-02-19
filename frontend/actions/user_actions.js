import * as UserApiUtil from '../util/user_api_util';

export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const receiveProfile = user => ({
  type: RECEIVE_PROFILE,
  user
});

export const fetchProfile = id =>(
  dispatch => (PostApiUtil.fetchProfile(id).then(user => dispatch(receiveProfile(user))))
);
