json.extract! comment, :body, :parent_id, :commentable_id, :commentable_type
json.author comment.author, partial: '/api/users/user', as: :user
json.timestamp comment.updated_at
json.child_ids comment.child_ids
