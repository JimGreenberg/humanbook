```javascript
{
  currentUser: {
    id: 1,
    username: "jerry@seinfeld.com"
  },
  profile: {
    fname: "Jerry",
    lname: "Seinfeld",
    work: "comedian",
    birthday: "4/29/1954",
    profile_pic: "seinfeld.com/jerry.jpg",
    cover_photo: "seinfeld.com/brick_wall.jpg",
    location: "New York"
  },
  timeline: {
    1: {
      body: "what's the deal with web apps?",
      author_id: 1
    }

    2: {
      body: "it's the summer of George!"
      author_id: 2
    }
  },
  friendships: {
    1: {
      user1: 1,
      user2: 2,
      status: "friends"
    },
    2: {
      user1_id: 1,
      user2_id: 10,
      status: "pending"
    }
  },
}
```
