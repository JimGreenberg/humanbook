class Pendfriend < ActiveRecord::Migration[5.0]
  def change
    add_column(:friendships, :completed, :boolean, null: false, default: false)
  end
end
