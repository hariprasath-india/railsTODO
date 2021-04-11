class TodosController < ApplicationController
  before_action :authenticate_user!
  before_action :set_todo, only: %i[ show edit update destroy ]
  before_action :get_all_todo, only: %i[ index ]

  # GET /todos or /todos.json
  def index
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
    @todo[:status] = 'open'
    respond_to do |format|
      if @todo.save
        format.html { redirect_to todos_url, notice: "Todo was successfully created." }
        format.json { head :no_content }
      else
        format.html { redirect_to todos_url, status: :unprocessable_entity }
        format.json { render json: @todo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /todos/1 or /todos/1.json
  def update
    respond_to do |format|
      if @todo.update(todo_params)
        format.html { redirect_to todos_url, notice: "Todo was successfully updated." }
        format.json { head :no_content }
      else
        format.html { redirect_to todos_url, status: :unprocessable_entity }
        format.json { render json: @todo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /todos/1 or /todos/1.json
  def destroy
    @todo.destroy
    respond_to do |format|
      format.html { redirect_to todos_url, notice: "Todo was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @todo = Todo.find(params[:id])
    end

    def get_all_todo
      @todos = Todo.all.where(:user_id => current_user.id).sort_by {|sort| sort.updated_at}
    end

    # Only allow a list of trusted parameters through.
    def todo_params
      params.fetch(:todo, {})
    end
end
