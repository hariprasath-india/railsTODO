class CreateTodos < ActiveRecord::Migration[5.2]
  def change
    create_table :todos do |t|
      t.string :task_name,              null: false, default: ""
      t.integer :user_id,              null: false
      t.string :status,              null: false, default: ""
      t.timestamps
    end
  end
end
