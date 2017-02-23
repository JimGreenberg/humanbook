export const createComment = comment => (
  $.ajax({
    method: 'POST',
    url: '/api/comments'
  })
);

export const updateComment = comment => (
  $.ajax({
    method: 'PATCH',
    url: `/api/comments/${id}`
  })
);

export const deleteComment = id => (
  $.ajax({
    method: 'DELETE',
    url: `/api/comments/${id}`
  })
);
