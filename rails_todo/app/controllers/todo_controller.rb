class TodoController < ApplicationController
    before_action :authenticate_user!
end
