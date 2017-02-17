import { RECEIVE_ALL_POSTS, REMOVE_POST } from '../actions/post_actions';
import merge from 'lodash/merge';

const PostsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_ALL_POSTS:
      return merge({}, oldState, action.posts);
    case REMOVE_POST:
      let newState = merge({}, oldstate);
      delete newState[action.post.id];
      return newState;
    default:
      return oldState;
  }
};

export default PostsReducer;
