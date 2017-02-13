# Schema Information

## users
column name       | data type | details
------------------|-----------|--------------------------
id                | integer   | not null, primary key
username          | string    | not null, indexed, unique
fname             | string    | not null, indexed, unique
lname             | string    | not null, indexed, unique
password_digest   | string    | not null
session_token     | string    | not null, indexed, unique
cover_photo       | string    |
profile_photo     | string    |  
work              | string    |
location          | string    |
birthday          | string    |

## friendships
column name       | data type | details
------------------|-----------|--------------
id                | integer   | not null, primary key
user1_id          | integer   | not null, foreign key (references users), indexed
user2_id          | integer   | not null, foreign key (references users), indexed

## posts
column name         | data type | details
--------------------|-----------|--------------
id                  | integer   | not null, primary key
author_id           | integer   | not_null, foreign key (references users), indexed
timeline_of_user_id |integer    | not null, foreign key (references users), indexed
body                | text      | not null

## comments
column name       | data type | details
------------------|-----------|--------------
id                | integer   | not null, primary key
author_id         | integer   | not_null, foreign key (references users), indexed
post_id           | integer   | not_null, foreign key (references posts)
body              | text      | not null
