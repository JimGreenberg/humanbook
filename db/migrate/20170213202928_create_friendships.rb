class CreateFriendships < ActiveRecord::Migration[5.0]
  def change
    create_table :friendships do |t|
      t.integer :friender_id, null: false
      t.integer :receiver_id, null: false
      t.timestamps
    end
    add_index(:friendships, :friender_id)
    add_index(:friendships, :receiver_id)
  end
end
