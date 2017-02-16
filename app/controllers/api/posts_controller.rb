class Api::PostsController < ApplicationController

  def show
    @post = Post.find(params.id)
    render json: {post: @post}
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render json: {post: @post}
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  private
  def post_params
    params.require(:post).permit(:body, :author_id, :wall_user_id)
  end
end
