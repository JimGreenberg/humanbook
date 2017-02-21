import { RECEIVE_ALL_POSTS, REMOVE_POST, RECEIVE_POST } from '../actions/post_actions';
import { RECEIVE_PROFILE } from '../actions/user_actions';
import merge from 'lodash/merge';

const PostsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_ALL_POSTS:
      return merge({}, action.posts);
    case RECEIVE_POST:
      return merge({}, oldState, {[action.post.id]: action.post});
    case REMOVE_POST:
      let newState = merge({}, oldState);
      let deleteId = null;
      Object.keys(newState).forEach(
        postId => {
          if (newState[postId].id === action.post.id) {
            deleteId = postId;
          }
        }
      );
      delete newState[deleteId];
      return newState;
    case RECEIVE_PROFILE:
        return merge({}, action.posts);
    default:
      return oldState;
  }
};

export default PostsReducer;
