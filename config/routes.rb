Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :posts, only: [:create, :show]
    match '/newsfeed', to: 'posts#newsfeed', via: :get
    match '/timeline', to: 'posts#timeline', via: :get
  end
  root 'static_pages#root'
end
