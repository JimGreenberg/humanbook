json.body post.body
json.id post.id
json.wall_user_id post.wall_user_id
json.author_id post.author_id
json.timestamp post.updated_at
json.wall_owner post.wall_owner, partial: '/api/users/user', as: :user
json.author post.author, partial: '/api/users/user', as: :user
comments = post.comments

json.set! :comments do
  comments.each do |comment|
    json.set! comment.id do
      json.partial! '/api/comments/comment', comment: comment
    end
  end
end
json.topLevelComments post.top_level_comment_ids
