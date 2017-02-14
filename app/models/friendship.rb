class Friendship < ApplicationRecord

  belongs_to :friendee
    class_name: :Friendship,
    foreign_key: :user2_id,
    primary_key: :id

  belongs_to :friender
    class_name: :Friendship,
    foreign_key: :user1_id,
    primary_key: :id

end
