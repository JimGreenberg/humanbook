class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :username, null: false, uniqueness: true
      t.string :fname, null: false
      t.string :lname, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false, uniqueness: true
      t.string :cover_photo
      t.string :profile_pic

      t.timestamps
    end
    add_index(:users, :fname)
    add_index(:users, :lname)
    add_index(:users, :username)
    add_index(:users, :session_token)
  end
end
