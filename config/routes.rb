Rails.application.routes.draw do
  resources :objectives do
    member do
      patch :move
    end
  end

  resources :tasks do
    member do
      patch :move
    end
  end

  devise_for :users
  root to: 'objectives#index'
end
