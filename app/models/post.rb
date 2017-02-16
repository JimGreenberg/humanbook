# == Schema Information
#
# Table name: posts
#
#  id           :integer          not null, primary key
#  author_id    :integer          not null
#  body         :text             not null
#  wall_user_id :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Post < ApplicationRecord
  validates :body, :author_id, :user_wall_id, presence: true

  belongs_to :author,
    class_name: :User,
    foreign_key: :author_id

  belongs_to :wall_owner,
    class_name: :User,
    foreign_key: :wall_user_id
end