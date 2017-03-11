import * as FriendsApiUtil from '../util/friends_api_util';

export const RECEIVE_FRIENDSHIP = 'RECEIVE_FRIENDSHIP';
export const RECEIVE_ALL_FRIENDSHIPS = 'RECEIVE_ALL_FRIENDSHIPS';
export const REMOVE_FRIENDSHIP = 'REMOVE_FRIENDSHIP';

export const receiveFriendship = friendship => ({
  type: RECEIVE_FRIENDSHIP,
  friendship
});

export const receiveAllFriendships = data => ({
  type: RECEIVE_ALL_FRIENDSHIPS,
  friends: data.friends,
  friendships: data.friendships
});

export const removeFriendship = friendship => ({
  type: REMOVE_FRIENDSHIP,
  friendship
});

export const fetchFriends = userId => (
  dispatch => (FriendsApiUtil.fetchFriends(userId)
  .then(data => dispatch(receiveAllFriendships(data))))
);

export const sendRequest = userId => (
  dispatch => (FriendsApiUtil.sendRequest(userId)
  .then(friendship => dispatch(receiveFriendship(friendship))))
);

export const confirmRequest = id => (
  dispatch => (FriendsApiUtil.confirmRequest(id)
  .then(friendship => dispatch(receiveFriendship(friendship))))
);

export const deFriend = id => (
  dispatch => (FriendsApiUtil.deFriend(id)
  .then(friendship => dispatch(removeFriendship(friendship))))
);
