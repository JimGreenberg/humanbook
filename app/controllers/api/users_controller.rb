class Api::UsersController < ApplicationController

  def index
    @users = User.all;
    render :index
  end

  def show
    @user = User
      .includes(wall_posts: [:wall_owner, :author, {comments: [:children, :author]}, :comment_authors, :top_level_comments])
      .find(params[:id])
    @friends = @user.friends
    @friendships = @user.friendships
    render :profile
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in!(@user)
      render "api/users/show"
    else
      render json: @user.errors, status: 422
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render "api/users/show"
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

end
