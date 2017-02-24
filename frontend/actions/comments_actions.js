import * as CommentApiUtil from '../util/comment_api_util';

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const removeComment = comment => ({
  type: REMOVE_COMMENT,
  comment
});

export const receiveComment = comment => {
  return ({
  type: RECEIVE_COMMENT,
  comment
});};

export const deleteComment = id => (
  dispatch => (CommentApiUtil.deleteComment(id).then(post => dispatch(removeComment(post))))
);

export const createComment = post => (
  dispatch => (CommentApiUtil.createComment(post).then(post => dispatch(receiveComment(post))))
);

export const updateComment = post => (
  dispatch => (CommentApiUtil.updateComment(post).then(post => dispatch(receiveComment(post))))
);
