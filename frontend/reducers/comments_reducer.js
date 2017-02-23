import { REMOVE_COMMENT, RECEIVE_COMMENT } from '../actions/comments_actions';
import merge from 'lodash/merge';

const CommentsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_COMMENT:
      return merge({}, oldState, {[action.comment.id]: action.comment});
    case REMOVE_COMMENT:
      const newState = merge({}, oldState);
      delete newState[action.comment.id];
      return newState;
    default:
      return oldState;
  }
};

export default CommentsReducer;
