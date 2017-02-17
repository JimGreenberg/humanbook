import * as PostApiUtil from '../util/post_api_util';
import { hashHistory } from 'react-router';

export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';
export const REMOVE_POST = 'REMOVE_POST';

export const receiveAllPosts = posts => ({
  type: RECEIVE_ALL_POSTS,
  posts
});

export const removePost = post => ({
  type: REMOVE_POST,
  post
});

export const fetchNewsfeed = () => (
  dispatch => (PostApiUtil.fetchNewsfeed().then(posts => dispatch(receiveAllPosts(posts))))
);

export const fetchTimeline = () => (
  dispatch => (PostApiUtil.fetchTimeline().then(posts => dispatch(receiveAllPosts(posts))))
);

export const deletePost = id => (
  dispatch => (PostApiUtil.deletePost(id).then(post => dispatch(removePost(post))))
);

export const createPost = post => (
  dispatch => (PostApiUtil.createPost(post).then(post => dispatch(receivePost(post))))
);

export const updatePost = post => (
  dispatch => (PostApiUtil.updatePost(post).then(post => dispatch(receivePost(post))).then(hashHistory.push('/')))
);
