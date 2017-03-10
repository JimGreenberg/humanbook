class Api::PostsController < ApplicationController

  def show
    @post = Post.find(params[:id])
                .includes(:top_level_comments)
                .includes(comments: :children)
                .includes(:comment_authors)
    render :show
  end

  def newsfeed
    @posts = current_user.newsfeed_posts
                         .includes(:author, :wall_owner)
                         .includes(comments: :children)
                         .includes(:comment_authors)
    render :newsfeed
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.destroy
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
