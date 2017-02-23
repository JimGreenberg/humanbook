import { RECEIVE_PROFILE } from '../actions/user_actions';
import merge from 'lodash/merge';

const FriendsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_PROFILE:
      return merge({}, action.friends)
    default:
      return oldState;
  }
};

export default FriendsReducer;
