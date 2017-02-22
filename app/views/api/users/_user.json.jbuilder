json.extract! user, :id, :username, :fname, :lname
json.profile_pic_url asset_path(user.profile_pic.url)
