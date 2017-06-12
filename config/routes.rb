Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  constraints subdomain: 'api' do
    resources :notes
  end
end
