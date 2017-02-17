class Api::PostsController < ApplicationController

  def show

    @post = Post.find(params[:id])
    render :show
  end

  def newsfeed

    @posts = current_user.newsfeed_posts
    render :index
  end

  def timeline
    @posts = wall_posts(params[:user_id])
    render :index
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  private
  def post_params
    params.require(:post).permit(:body, :author_id, :wall_user_id)
  end
end
