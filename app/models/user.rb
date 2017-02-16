# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  fname           :string           not null
#  lname           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  cover_photo     :string
#  profile_pic     :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  before_validation :ensure_session_token
  validates :username, :fname, :lname, :password_digest, presence: true
  validates :username, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}

  attr_reader :password

  has_many :authored_posts,
    class_name: :Post,
    foreign_key: :author_id

  has_many :wall_posts,
    class_name: :Post,
    foreign_key: :wall_user_id

  has_many :in_friendships,
    class_name: :Friendship,
    foreign_key: :receiver_id

  has_many :out_friendships,
    class_name: :Friendship,
    foreign_key: :friender_id

  has_many :in_friends,
    through: :in_friendships,
    source: :friender

  has_many :out_friends,
    through: :out_friendships,
    source: :receiver

  def friends
    in_friends + out_friends
  end

  def make_friend(other_user)
    return if is_friends?(other_user)
    Friendship.create!(friender_id: self.id, receiver_id: other_user.id)
  end

  def defriend(other_user)
    return unless is_friends?(other_user)
    Friendship.where(friender_id: self.id, receiver_id: other_user.id).destroy_all!
    Friendship.where(friender_id: other_user.id, receiver_id: self.id).destroy_all!
  end

  def is_friends?(other_user)
    friends.include?(other_user)
  end

#-----------------#
###### Auth ######
#-----------------#
  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return nil unless !!user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end

  def is_password?(password)
      BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = new_session_token
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= new_session_token
  end

  def new_session_token
    SecureRandom.base64
  end
end
