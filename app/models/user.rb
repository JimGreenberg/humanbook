class User < ApplicationRecord
  before_validation :ensure_session_token
  validates :username, :fname, :lname, :password_digest, presence: true
  validates :username, uniqueness: true
  validates :password length{ minimum: 6, allow_nil: true}

  attr_reader :password

  def friendships
    #mutually symmetric association
    Friendship.where("user1_id = #{self.id} OR user2_id = #{self.id}")
  end
  # ???

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return nil if !!user
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
