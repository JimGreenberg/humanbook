
export const fetchNewsfeed = () => (
  $.ajax({
    method: 'GET',
    url: 'api/newsfeed'
  })
);

export const fetchTimeline = () => (
  $.ajax({
    method: 'GET',
    url: 'api/timeline'
  })
);

export const fetchPost = id => (
  $.ajax({
    method: 'GET',
    url: `api/posts/${id}`
  })
);

export const deletePost = id => (
  $.ajax({
    method: 'DELETE',
    url: `api/posts/${id}`
  })
);

export const updatePost = post => (
  $.ajax({
    method: 'PATCH',
    url: `api/posts/${post.id}`,
    data: {post}
  })
);

export const createPost = post => (
  $.ajax({
    method: 'POST',
    url: `api/posts`,
    data: {post}
  })
);
