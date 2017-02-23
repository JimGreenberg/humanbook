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

jerry = User.create!(username: "jerry@seinfeld.com", fname: "Jerry", lname: "Seinfeld", password:"asdfasdf")
george = User.create!(username: "george.costanza@yankeesny.com", fname: "George", lname: "Costanza", password:"asdfasdf")
elaine = User.create!(username: "ebenes@jpeterman.com", fname: "Elaine", lname: "Benes", password:"asdfasdf")
kramer = User.create!(username: "kramer@kramer.co", fname: "Cosmo", lname: "Kramer", password:"asdfasdf")
newman = User.create!(username: "newman@usps.gov", fname: "Newman", lname: "Newman", password:"asdfasdf")
jpeterman = User.create!(username: "ceo@jpeterman.com", fname: "J.", lname: "Peterman", password:"asdfasdf")
bob = User.create!(username: "bsacomano@mafia.org", fname: "Bob", lname: "Sacamano", password:"asdfasdf")
puddy = User.create!(username: "puddy@davesgarage.com", fname: "Dave", lname: "Puddy", password:"asdfasdf")
frank = User.create!(username: "fcostanza@roadrunner.co", fname: "Frank", lname: "Costanza", password:"asdfasdf")
tim = User.create!(username: "toothd3cay@shalom.net", fname: "Tim", lname: "Whatley", password:"asdfasdf")
art = User.create!(username: "vandelay@architect.us", fname: "Art", lname: "Vandelay", password:"asdfasdf")
pennypacker = User.create!(username: "he@pennypa.ck", fname: "H.E.", lname: "Pennypacker", password:"asdfasdf")

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

post1=Post.create!(body: "to jerry from george", author_id: george.id, wall_user_id: jerry.id)
post2=Post.create!(body: "to jerry from elaine", author_id: elaine.id, wall_user_id: jerry.id)
post3=Post.create!(body: "to george from elaine", author_id: elaine.id, wall_user_id: george.id)
post4=Post.create!(body: "to george from kramer", author_id: kramer.id, wall_user_id: george.id)
post5=Post.create!(body: "these pretzels are making me thirsty", author_id: george.id, wall_user_id: george.id)
post6=Post.create!(body: "ITS THE SUMMER OF GEORGE", author_id: george.id, wall_user_id: george.id)
post7=Post.create!(body: "an architect?", author_id: elaine.id, wall_user_id: george.id)
post8=Post.create!(body: "to george kramer", author_id: george.id, wall_user_id: kramer.id)
post9=Post.create!(body: "asdfasopdfja[psiodfjasef", author_id: george.id, wall_user_id: jerry.id)
post10=Post.create!(body: "asdfasef", author_id: bob.id, wall_user_id: jerry.id)
post11=Post.create!(body: "NEWMAN", author_id: newman.id, wall_user_id: art.id)
post12=Post.create!(body: "to art from jerry", author_id: jerry.id, wall_user_id: art.id)

comment1=Comment.create!(commentable_type: "Post", body: "you shitpickle", author_id: jerry.id, commentable_id: post1.id)
comment2=Comment.create!(commentable_type: "Post", body: "Hi elaine", author_id: jerry.id, commentable_id: post3.id)
comment3=Comment.create!(commentable_type: "Post", body: "Hi elaine, again", author_id: jerry.id, commentable_id: post3.id, parent_id: comment2.id)
comment4=Comment.create!(commentable_type: "Post", body: "Hi tom", author_id: jerry.id, commentable_id: post3.id, parent_id: comment2.id)
comment5=Comment.create!(commentable_type: "Post", body: "babka", author_id: jerry.id, commentable_id: post1.id, parent_id: comment1.id)
comment6=Comment.create!(commentable_type: "Post", body: "VEGAN FIGHTER", author_id: jerry.id, commentable_id: post1.id)
comment7=Comment.create!(commentable_type: "Post", body: "help me fight children", author_id: jerry.id, commentable_id: post1.id, parent_id: comment1.id)
comment8=Comment.create!(commentable_type: "Post", body: "i don't like other people", author_id: jerry.id, commentable_id: post1.id)
comment9=Comment.create!(commentable_type: "Post", body: "eifjs", author_id: jerry.id, commentable_id: post1.id)
comment10=Comment.create!(commentable_type: "Post", body: "Hi elaine", author_id: jerry.id, commentable_id: post1.id)
