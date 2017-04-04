Rails.application.routes.draw do
  get 'charges/new'

  get 'charges/create'

  root to: 'pages#home'
  devise_for :users, controllers: { registrations: 'users/registrations' }
  get 'about', to: 'pages#about'
  resources :contacts, only: :create
  get 'contact-us', to:"contacts#new", as: 'new_contact'
end
