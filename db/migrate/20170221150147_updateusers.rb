class Updateusers < ActiveRecord::Migration[5.0]
  def change
    add_column(:users, :birthday, :string)
    add_column(:users, :relationship, :string)
    add_column(:users, :work, :string)
    add_column(:users, :where, :string)
    add_column(:users, :from, :string)
    add_column(:users, :school, :string)
  end
end
