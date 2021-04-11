class ApplicationController < ActionController::Base
    before_action :configure_permitted_parameters, if: :devise_controller?
    def authenticate_user!
        redirect_to new_user_session_path unless user_signed_in?
    end

    

    protected

    def configure_permitted_parameters
        attributes = [:fullName]
        devise_parameter_sanitizer.permit(:sign_up, keys: attributes)
    end
end
