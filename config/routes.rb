Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :get]
    resource :session, only: [:create, :destroy]
    resources :posts, only: [:create, :show, :update, :destroy]
    match '/newsfeed', to: 'posts#newsfeed', via: :get
    match '/timeline/:id', to: 'posts#timeline', via: :get
    match '/users/:id', to: 'users#show', via: :get
  end
  root 'static_pages#root'
end
