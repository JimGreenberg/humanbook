json.user @user.attributes
json.posts (@user.wall_posts) do |post|
  json.partial! '/api/posts/post', post: post
end
json.friendships (@user.friendships) do |friendship|
  json.partial! '/api/friendships/friendship', friendship: friendship
end
