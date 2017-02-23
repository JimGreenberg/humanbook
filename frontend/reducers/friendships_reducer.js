import {RECEIVE_FRIENDSHIP, RECEIVE_ALL_FRIENDSHIPS, REMOVE_FRIENDSHIP} from '../actions/friends_actions';
import { RECEIVE_PROFILE } from '../actions/user_actions';
import merge from 'lodash/merge';

const FriendshipsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_ALL_FRIENDSHIPS:
      return merge({}, oldState, action.friendships);
    case RECEIVE_PROFILE:
      return merge({}, action.friendships);
    case RECEIVE_FRIENDSHIP:
      return merge({}, oldState, {[action.friendship.id]: action.friendship});
    case REMOVE_FRIENDSHIP:
      let newState = merge({}, oldState);
      let deleteId = null;
        Object.keys(newState).forEach(
          friendshipId => {
            if (newState[friendshipId].id === action.friendship.id) {
            deleteId = friendshipId;
          }
        }
      );
      delete newState[deleteId];
      return newState;
    default:
      return oldState;
  }
};

export default FriendshipsReducer;
