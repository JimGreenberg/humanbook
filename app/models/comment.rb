# == Schema Information
#
# Table name: comments
#
#  id               :integer          not null, primary key
#  body             :text             not null
#  commentable_type :string           not null
#  commentable_id   :integer          not null
#  parent_id        :integer
#  author_id        :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Comment < ApplicationRecord
  validates :body, :author_id, :commentable_id, :commentable_type, presence: true

  belongs_to :commentable, polymorphic: true

  has_many :children,
    foreign_key: :parent_id,
    class_name: :Comment

  belongs_to :author,
    class_name: :User,
    foreign_key: :author_id
end
