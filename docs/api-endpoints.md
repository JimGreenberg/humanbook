# API Endpoints

## HTML API

###Root
* GET / - loads React web app


## JSON API

### Users
* POST /api/users
* GET /api/users/:id

### Session
* POST /api/session
* DELETE /api/session

### Friends
* POST /api/users/:id/friendships
* GET /api/users/:id/friendships
* DELETE /api/friendships/:id

### Posts
* POST /api/posts/
* GET /api/posts
* DELETE /api/post/:id
* GET /api/posts/:id
* PATCH /api/posts/:id
* GET /api/users/:id/posts
  - for user timeline

### Comments
* POST /api/post/:id/comments
* GET /api/post/:id/comments
* DELETE /api/comments/:id
* PATCH /api/comments/:id
