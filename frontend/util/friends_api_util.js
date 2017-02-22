export const fetchFriends = userId => (
  $.ajax({
    method: 'GET',
    url: `api/users/${userId}/friendships/`
  })
);

export const sendRequest = userId => (
  $.ajax({
    method: 'POST',
    url: `api/users/${userId}/friendships/`
  })
);

export const deFriend = id => (
  $.ajax({
    method: 'DELETE',
    url: `api/friendships/${id}`
  })
);

export const confirmRequest = id => (
  $.ajax({
    method: 'PATCH',
    url: `api/friendships/${id}`
  })
);
