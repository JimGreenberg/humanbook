
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
  validates :body, :author_id, :wall_user_id, presence: true

  belongs_to :author,
    class_name: :User,
    foreign_key: :author_id

  belongs_to :wall_owner,
    class_name: :User,
    foreign_key: :wall_user_id

  has_many :comments, as: :commentable

  has_many :top_level_comments, -> {where(parent_id: nil)},
    foreign_key: :commentable_id,
    class_name: :Comment

  has_many :comment_authors,
    through: :comments,
    source: :author

  def self.wall_posts(user)
    Post.where(wall_owner: user.id)
    .includes(:top_level_comments)
    .includes(comments: :children)
    .includes(:comment_authors)
  end

end
