class Friendship < ApplicationRecord

  belongs_to :receiver,
    class_name: :User,
    foreign_key: :receiver_id

  belongs_to :friender,
    class_name: :User,
    foreign_key: :friender_id

end
