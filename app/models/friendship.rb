# == Schema Information
#
# Table name: friendships
#
#  id          :integer          not null, primary key
#  friender_id :integer          not null
#  receiver_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  completed   :boolean          default(FALSE), not null
#

class Friendship < ApplicationRecord

  belongs_to :receiver,
    class_name: :User,
    foreign_key: :receiver_id

  belongs_to :friender,
    class_name: :User,
    foreign_key: :friender_id

end
