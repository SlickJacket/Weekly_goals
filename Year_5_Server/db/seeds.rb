# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.create(name: "Reginald", end_goal: "To be the very best", url: "url link")

Goal.create(title: "Get more followers", content: "code more", dataset: "4-5", user_id: 1)
Goal.create(title: "Get more followers", content: "code more", dataset: "4-6", user_id: 1)
Goal.create(title: "Get more followers", content: "code more", dataset: "4-5", user_id: 1)