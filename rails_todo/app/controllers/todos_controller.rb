class TodosController < ApplicationController
  before_action :authenticate_user!
  before_action :set_todo, only: %i[ show edit update destroy ]

  # GET /todos or /todos.json
  def index
    @todos = Todo.all.where(:user_id => current_user.id).sort_by {|sort| sort.updated_at}
  end

  # GET /todos/1 or /todos/1.json
  def show
  end

  # GET /todos/new
  def new
    @todo = Todo.new
    puts "Todo #{@todo.inspect}"
  end

  # GET /todos/1/edit
  def edit
  end

  # POST /todos or /todos.json
  def create
    @todo = Todo.new(todo_params)
    @todo[:user_id] = current_user.id
    @todo[:status]= 'Open'
    if @todo[:task_name] != ''
      if @todo.save
        render :json => {"message" => "success","data" => @todo}
      else
        render :json => {"data" => @todo.errors}
      end
    else
      render :json => {"message" => "Name not to be blank"}
    end
      
  end

  # PATCH/PUT /todos/1 or /todos/1.json
  def update
    if @todo.update(todo_params)
      
      render :json => {"message" => "success","data" => @todo}
    else
      render :json => {"message" => "Problem in Update Status"}
    end
  end

  # DELETE /todos/1 or /todos/1.json
  def destroy
    if @todo.destroy
      render :json => {"message" => "success"}  
    else
      render :json => {"message" => "Problem in Delete"}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @todo = Todo.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def todo_params
      params.fetch(:todo, {})
    end
end
