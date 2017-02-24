json.set! :users do
  @users.each do |user|
    json.set! user.id do
      json.user json.partial! '/api/users/user', user: user
    end
  end
end
