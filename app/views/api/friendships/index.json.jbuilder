json.set! :friendships do
  @friendships.each do |friendship|
    json.set! friendship.id do
      json.partial! '/api/friendships/friendship', friendship: friendship
    end
  end
end

json.set! :friends do
  @friends.each do |friend|
    json.set! friend.id do
      json.partial! '/api/users/user', user: friend
    end
  end
end
