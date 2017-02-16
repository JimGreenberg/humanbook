class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.integer :author_id, null: false
      t.text :body, null: false
      t.integer :wall_user_id, null: false
      t.timestamps
    end
    add_index(:posts, :author_id)
    add_index(:posts, :wall_user_id)
  end
end
