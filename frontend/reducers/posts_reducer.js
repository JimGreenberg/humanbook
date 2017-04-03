import { RECEIVE_ALL_POSTS, REMOVE_POST, RECEIVE_POST } from '../actions/post_actions';
import { RECEIVE_PROFILE } from '../actions/user_actions';
import { REMOVE_COMMENT, RECEIVE_COMMENT } from '../actions/comments_actions';

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
      delete newState[action.post.id];
      return newState;
    case RECEIVE_PROFILE:
        return merge({}, action.posts);
    case RECEIVE_COMMENT:
      let comments = merge({}, oldState[action.comment.commentable_id].comments);
      comments[action.comment.id] = action.comment;
      let parent = comments[action.comment.parent_id];

      let topLevelComments = [...oldState[action.comment.commentable_id].topLevelComments];
      if (parent) {
        if(!parent.child_ids.includes(action.comment.id)) {parent.child_ids.push(action.comment.id);}
      } else if (!topLevelComments.includes(action.comment.id)) {
        topLevelComments.push(action.comment.id);
      }

      return merge({}, oldState, {
        [action.comment.commentable_id]: merge({}, oldState[action.comment.commentable_id], {
          comments,
          topLevelComments
        })
      });

    case REMOVE_COMMENT:
      newState = merge({}, oldState);
      comments = newState[action.comment.commentable_id].comments;

      parent = comments[action.comment.parent_id];
      if (parent) {
        parent.child_ids = parent.child_ids.filter(id => id !== action.comment.id);
      }

      topLevelComments = newState[action.comment.commentable_id].topLevelComments;
      topLevelComments = topLevelComments.filter(id => id !== action.comment.id);
      newState[action.comment.commentable_id].topLevelComments = topLevelComments;

      delete comments[action.comment.id];
      return merge({}, newState, {
        [action.comment.commentable_id]: merge({}, newState[action.comment.commentable_id], {
          comments,
          topLevelComments
        })
      });

    default:
      return oldState;
  }
};

export default PostsReducer;
