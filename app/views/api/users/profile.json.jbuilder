user = @user.attributes
user['profile_pic_url'] = asset_path(@user.profile_pic.url)
user['cover_photo_url'] = asset_path(@user.cover_photo.url)
json.user user

json.set! :posts do
  json.posts json.partial! '/api/posts/index', posts: @user.wall_posts
end

json.set! :friendships do
  @user.friendships.each do |friendship|
    json.set! friendship.id do
      json.partial! '/api/friendships/friendship', friendship: friendship
    end
  end
end

json.set! :friends do
  @user.friends.each do |friend|
    json.set! friend.id do
      json.partial! '/api/users/user', user: friend
    end
  end
end
