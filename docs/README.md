![disgracebook](./production_images/disgracebook logos-01.png)
# Development README
disgracebook is a clone of the popular social media webapp 'facebook' implemented with a PostgreSQL-Ruby on Rails-React/Redux stack.

[Trello](https://trello.com/b/1XmsXMgk/facebook-clone-fullstack)
[Heroku](https://www.heroku.com)

## Minimum Viable Product
By 2/27/2017 the webapp should have the following features implemented as closely as possible to the parent app including a lightweight user experience, functionality and styling.

- [ ] New account creation and login, as well as a demo login
- [ ] A production README, complete with images and highlights of the features
- [ ] Hosting on Heroku
- [ ] Working profiles for each user
- [ ] Working 'friending' functionality between users
- [ ] Timeline posts as well as comments on those posts
- [ ] Newsfeed for the currrent user, complete with recent posts on friends' timelines as well as the current user's

### Extension
Time permitting, the following features could be added to enhance the webapp (in no particular order):
- [ ] 'Likes' and 'Reactions' on posts and comments
- [ ] Trending topics and "dynamic" ads
- [ ] Notifications
- [ ] Comments on other comments ("nested comments")
- [ ] Search for users/pages
- [ ] Messaging
- [ ] Photos/albums for users and/or posts

## Design Docs
* [View Wireframes](./wireframes)
* [React Component Hierarchy](component-hierarchy.md)
* [API endpoints](api-endpoints.md)
* [DB schema](schema.md)
* [Sample State](sample-state.md)

## Implementation Timeline
### Phase I: Backend setup and Auth (1 Day)
  - Functioning rails project with front end authentication
    + initial database and simple seeds
    + CSS styling to mimic facebook

### Phase II: User profiles (2 Days)
  - Blank profile set up on new account
    + Profile editable
      * Supports profile pic, cover photo as well as basic Information
  - CSS styling to mimic facebook

### Phase III: Friendships (1 Day)
  - Ability to friend another user
    + Creates an entry in the `friendships` join table with both users
  - Ability to defriend a friendships
    + Removes entry in above table
  - Friends viewable from profile

### Phase IV: Posting (3 Days)
  - Ability to create posts on own or other user's timeline
    + From profile view
  - Ability to create posts from newsfeed
  - Newsfeed contains recent posts from self and friends
  - Scrolls infinitely, recent = up
  - CSS styling to mimic facebook

### Phase V: Comments (2 Days)
  - Ability to create comments on posts
    + Agnostic of newsfeed post or timeline post
  - CSS styling to mimic facebook

### Phase VI+: (? Days)
  - Decide upon and implement as many extension features as possible (see above)
