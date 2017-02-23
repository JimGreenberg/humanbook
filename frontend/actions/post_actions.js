import * as PostApiUtil from '../util/post_api_util';


export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const DISPATCH_VIEW = 'DISPATCH_VIEW';

export const receiveAllPosts = posts => {

  return ({
  type: RECEIVE_ALL_POSTS,
  posts
});};

export const removePost = post => ({
  type: REMOVE_POST,
  post
});

export const receivePost = post => {

  return ({
  type: RECEIVE_POST,
  post
});};


export const fetchNewsfeed = () => (
  dispatch => (PostApiUtil.fetchNewsfeed().then(posts => dispatch(receiveAllPosts(posts))))
);

export const fetchTimeline = id => (
  dispatch => (PostApiUtil.fetchTimeline(id).then(posts => dispatch(receiveAllPosts(posts))))
);

export const deletePost = id => (
  dispatch => (PostApiUtil.deletePost(id).then(post => dispatch(removePost(post))))
);

export const createPost = post => (
  dispatch => (PostApiUtil.createPost(post).then(post => dispatch(receivePost(post))))
);

export const updatePost = post => (
  dispatch => (PostApiUtil.updatePost(post).then(post => dispatch(receivePost(post))))
);
