class AddClientsToNotes < ActiveRecord::Migration[5.0]
  def change
    add_column :notes, :clients, :json
  end
end
