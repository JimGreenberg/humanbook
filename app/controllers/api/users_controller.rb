class Api::UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    render "api/users/profile"
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
