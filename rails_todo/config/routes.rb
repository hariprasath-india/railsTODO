Rails.application.routes.draw do
  resources :todos
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    :registrations => 'users/registrations'
  }
  root :to => 'todos#index'
end
