class Api::UsersController < ApplicationController

  def show
    @user = User
      .includes(
        wall_posts: [:wall_owner, :author])
      .find(params[:id])
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
end
