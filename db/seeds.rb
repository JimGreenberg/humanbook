# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Friendship.destroy_all
Post.destroy_all
Comment.destroy_all

jerry = User.create!(username: "jerry@seinfeld.com", fname: "Jerry", lname: "Seinfeld", password:"asdfasdf",
  profile_pic: 'https://s3.amazonaws.com/humanbook-pro/seinfeld/jerry_pro.jpg',
  cover_photo: 'https://s3.amazonaws.com/humanbook-pro/seinfeld/seinfeld_cover.png',
  work: "comedian" , school: "Queens College" , where: "NYC" , from: "NYC" , relationship: "single", birthday: "Apr 29 1954"
)
george = User.create!(username: "george.costanza@yankeesny.com", fname: "George", lname: "Costanza", password:"asdfasdf",
  profile_pic: 'https://s3.amazonaws.com/humanbook-pro/seinfeld/george_pro.jpg',
  cover_photo: 'https://s3.amazonaws.com/humanbook-pro/seinfeld/george_cover.png',
  work: "No thanks" , school: "Boston University" , where: "NYC" , from: "NYC" , relationship: "Widower", birthday: "Sep 23 1959"

)
elaine = User.create!(username: "ebenes@jpeterman.com", fname: "Elaine", lname: "Benes", password:"asdfasdf",
  profile_pic: 'https://s3.amazonaws.com/humanbook-pro/seinfeld/elaine_pro.jpg',
  cover_photo: 'https://s3.amazonaws.com/humanbook-pro/seinfeld/elaine_cover.jpg',
  work: "J Peterman Catalogue" , school: "Northwestern University" , where: "NYC" , from: "NYC" , relationship: "single", birthday: "Jan 13 1961"

)
kramer = User.create!(username: "kramer@kramer.co", fname: "Cosmo", lname: "Kramer", password:"asdfasdf",
  profile_pic: 'https://s3.amazonaws.com/humanbook-pro/seinfeld/kramer_pro.jpg',
  cover_photo: 'https://s3.amazonaws.com/humanbook-pro/seinfeld/kramer_cover.jpg',
  work: "Unemployed" , school: "Unknown" , where: "NYC" , from: "NYC" , relationship: "single", birthday: "Jul 24 1949"

)
newman = User.create!(username: "newman@usps.gov", fname: "Newman", lname: "Newman", password:"asdfasdf",
  profile_pic: 'https://s3.amazonaws.com/humanbook-pro/seinfeld/newman_pro.jpg',
  cover_photo: 'https://s3.amazonaws.com/humanbook-pro/seinfeld/newman_cover.jpg',
  work: "USPS" , school: "University of Georgia" , where: "NYC" , from: "NYC" , relationship: "single", birthday: "Aug 7 1955"

)
jpeterman = User.create!(username: "ceo@jpeterman.com", fname: "J.", lname: "Peterman", password:"asdfasdf", where: "NYC" , from: "NYC", work: "J Peterman Catalogue: CEO")

bob = User.create!(username: "bsacomano@mafia.org", fname: "Bob", lname: "Sacamano", password:"asdfasdf", where: "?" , from: "Italy", work: "Imports/Exports")

puddy = User.create!(username: "puddy@davesgarage.com", fname: "Dave", lname: "Puddy", password:"asdfasdf", work: 'mechanic', where: "NYC" , from: "NYC")

frank = User.create!(username: "fcostanza@roadrunner.co", fname: "Frank", lname: "Costanza", password:"asdfasdf", where: "NYC" , from: "NYC",
  profile_pic: 'https://s3.amazonaws.com/humanbook-pro/seinfeld/frank_pro.jpg',
  cover_photo: 'https://s3.amazonaws.com/humanbook-pro/seinfeld/frank_cover.jpg',
)
tim = User.create!(username: "toothd3cay@shalom.net", fname: "Tim", lname: "Whatley", password:"asdfasdf",
  profile_pic: 'https://s3.amazonaws.com/humanbook-pro/seinfeld/whatley_pro.jpg',
  cover_photo: 'https://s3.amazonaws.com/humanbook-pro/seinfeld/whatley_cover.jpg',
  work: "Dentist" , school: "Univeristy of Phoenix" , where: "NYC" , from: "Albuquerque NM" , relationship: "Married", birthday: "Mar 7 1956"

)
art = User.create!(username: "vandelay@architect.us", fname: "Art", lname: "Vandelay", password:"asdfasdf", work: "architect", where: "NYC" , from: "NYC")

pennypacker = User.create!(username: "he@pennypa.ck", fname: "H.E.", lname: "Pennypacker", password:"asdfasdf", where: "NYC" , from: "NYC", work: "Billionaire Tycoon/Philanthropist")

jerry.make_friend(george)
elaine.make_friend(jerry)
tim.make_friend(art)
jerry.make_friend(kramer)
frank.make_friend(jerry)
art.make_friend(jerry)
pennypacker.make_friend(jerry)
jerry.make_friend(puddy)
george.make_friend(kramer)
elaine.make_friend(george)
Friendship.create!(friender_id: tim.id, receiver_id: jerry.id, completed: false)

post1=Post.create!(body: "You've got to apologize", author_id: george.id, wall_user_id: jerry.id)
comment1_0=Comment.create!(commentable_type: "Post", body: "why?", author_id: jerry.id, commentable_id: post1.id)
comment1_1=Comment.create!(commentable_type: "Post", body: "because it's the mature and adult thing to do", author_id: george.id, commentable_id: post1.id)
comment1_2=Comment.create!(commentable_type: "Post", body: "but how does that affect me?", author_id: jerry.id, commentable_id: post1.id)

post2=Post.create!(body: "there's more to newman than meets the eye", author_id: elaine.id, wall_user_id: newman.id)
comment2=Comment.create!(commentable_type: "Post", body: "no, there's less", author_id: jerry.id, commentable_id: post2.id)

post3=Post.create!(body: "ITS THE SUMMER OF GEORGE", author_id: george.id, wall_user_id: george.id)

post4=Post.create!(body: "these pretzels are making me thirsty", author_id: kramer.id, wall_user_id: kramer.id)
comment4_0=Comment.create!(commentable_type: "Post", body: "THESE pretzels are making me thirsty", author_id: elaine.id, commentable_id: post4.id)
comment4_1=Comment.create!(commentable_type: "Post", body: "these pretzels are making ME thirsty", author_id: jerry.id, commentable_id: post4.id, parent_id: comment4_0.id)
comment4_2=Comment.create!(commentable_type: "Post", body: "THESE PRETZELS ARE MAKING ME THIRSTY!", author_id: george.id, commentable_id: post4.id)

post5=Post.create!(body: "You know you’re not supposed to brush your teeth for 24 hours before you go to the dentist", author_id: kramer.id, wall_user_id: jerry.id)
comment5_0=Comment.create!(commentable_type: "Post", body: "I think you’re thinking of ‘You’re not supposed to eat 24 hours before surgery’.", author_id: jerry.id, commentable_id: post5.id)
comment5_1=Comment.create!(commentable_type: "Post", body: " Oh, you gotta eat before surgery. You need your strength.", author_id: kramer.id, commentable_id: post5.id, parent_id: comment5_0.id)

post6=Post.create!(body: "Elaine, breaking up is like knocking over a Coke machine. You can’t do it in one push; you gotta rock it back and forth a few times and THEN it goes over.", author_id: jerry.id, wall_user_id: elaine.id)

post7=Post.create!(body: "If you’re not gonna be a part of a civil society, then just get in your car and drive on over to the East Side.", author_id: kramer.id, wall_user_id: kramer.id)

post8=Post.create!(body: "There is no bigger loser than me!", author_id: george.id, wall_user_id: george.id)

post9=Post.create!(body: "Do you have any conceivable reason for even getting up in the morning?", author_id: kramer.id, wall_user_id: george.id)
comment9_0=Comment.create!(commentable_type: "Post", body: "i like to get the daily news...", author_id: george.id, commentable_id: post9.id)
comment9_1=Comment.create!(commentable_type: "Post", body: "atta boy george!", author_id: jerry.id, commentable_id: post9.id, parent_id: comment9_0.id)

post11=Post.create!(body: "Hello, Jerry.", author_id: newman.id, wall_user_id: jerry.id)
comment11=Comment.create!(commentable_type: "Post", body: "Hello, Newman.", author_id: jerry.id, commentable_id: post11.id)

post12=Post.create!(body: "you know, I always wanted to prented I was an architect", author_id: george.id, wall_user_id: george.id)
comment10_0=Comment.create!(commentable_type: "Post", body: "Art Vandelay: Senior Architect, I can see it now...", author_id: art.id, commentable_id: post12.id)

post13=Post.create!(body: "I lie every second of the day. My whole life is a sham.", author_id: george.id, wall_user_id: george.id)

post14=Post.create!(body: "Why does everything have to be so... jokey with you?", author_id: elaine.id, wall_user_id: jerry.id)
comment14_0=Comment.create!(commentable_type: "Post", body: "I'm a comedian.", author_id: jerry.id, commentable_id: post14.id)


post10=Post.create!(body: "I gave all these out at the office as gifts", author_id: george.id, wall_user_id: jerry.id)
comment10_0=Comment.create!(commentable_type: "Post", body: "The human fund...", author_id: jerry.id, commentable_id: post10.id)
comment10_1=Comment.create!(commentable_type: "Post", body: "yup", author_id: george.id, commentable_id: post10.id)
comment10_2=Comment.create!(commentable_type: "Post", body: "money for people?", author_id: jerry.id, commentable_id: post10.id)
comment10_3=Comment.create!(commentable_type: "Post", body: "yeah isn't it great? i didn't spend a dime", author_id: george.id, commentable_id: post10.id)
comment10_4=Comment.create!(commentable_type: "Post", body: "this is a new low george, even for you", author_id: elaine.id, commentable_id: post10.id, parent_id: comment10_3.id)
