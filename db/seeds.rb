# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all

User.create!(username: "jerry@seinfeld.com" fname: "Jerry" lname: "Seinfeld" password:"asdfasdf")
User.create!(username: "george.costanza@yankeesny.com" fname: "George" lname: "Costanza" password:"asdfasdf")
User.create!(username: "ebenes@jpeterman.com" fname: "Elaine" lname: "Benes" password:"asdfasdf")
User.create!(username: "kramer@kramer.co" fname: "Cosmo" lname: "Kramer" password:"asdfasdf")
User.create!(username: "newman@usps.gov" fname: "Newman" lname: "Newman" password:"asdfasdf")
User.create!(username: "ceo@jpeterman.com" fname: "J." lname: "Peterman" password:"asdfasdf")
User.create!(username: "bsacomano@mafia.org" fname: "Bob" lname: "Sacamano" password:"asdfasdf")
User.create!(username: "puddy@davesgarage.com" fname: "Dave" lname: "Puddy" password:"asdfasdf")
User.create!(username: "fcostanza@roadrunner.co" fname: "Frank" lname: "Costanza" password:"asdfasdf")
User.create!(username: "toothd3cay@shalom.net" fname: "Tim" lname: "Whatley" password:"asdfasdf")
User.create!(username: "vandelay@architect.us" fname: "Art" lname: "Vandelay" password:"asdfasdf")
User.create!(username: "he@pennypa.ck" fname: "H.E." lname: "Pennypacker" password:"asdfasdf")
