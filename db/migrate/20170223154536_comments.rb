class Comments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
    t.text :body, null: false
    t.references :commentable, polymorphic: true, index: true, null: false
    t.integer :parent_id, index: true
    t.integer :author_id, index: true, null: false

    t.timestamps
  end
end
end
