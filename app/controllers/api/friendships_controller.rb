class Api::FriendshipsController < ApplicationController

  def index
    user = User.find(params[:user_id])
    @friendships = user.friendships
    render json: @friendships
  end

  def create
    receiver = User.find(params[:user_id])
    @friendship = current_user.add_friend(receiver)
    if @friendship.save
      render json: @friendship
    else
      render json: @friendship.errors, status: 422
    end
  end

  def destroy
    @friendship = Friendship.find(params[:id])
    @friendship.destroy
    render json: @friendship
  end

  def update
    @friendship = Friendship.find(params[:id])
    if @friendship.update(completed: true)
      render json: @friendship
    else
      render json: @friendship.errors, status: 422
    end
  end
end
