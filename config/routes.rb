Rails.application.routes.draw do

  constraints subdomain: 'api' do
    mount_devise_token_auth_for 'User', at: 'auth'
    resources :notes
  end

  root 'application#index'
  get '*path' => 'application#index', via: :all
end
