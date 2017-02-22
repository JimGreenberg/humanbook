user = @user.attributes
user['profile_pic_url'] = asset_path(@user.profile_pic.url)
user['cover_photo_url'] = asset_path(@user.cover_photo.url)
json.user user


json.posts (@user.wall_posts) do |post|
  json.partial! '/api/posts/post', post: post
end
json.friendships (@user.friendships) do |friendship|
  json.partial! '/api/friendships/friendship', friendship: friendship
end
