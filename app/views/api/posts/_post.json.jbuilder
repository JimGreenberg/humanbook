json.body post.body
json.id post.id
json.wall_user_id post.wall_user_id
json.author_id post.author_id
json.timestamp post.updated_at
json.wall_owner post.wall_owner, partial: '/api/users/user', as: :user
json.author post.author, partial: '/api/users/user', as: :user
