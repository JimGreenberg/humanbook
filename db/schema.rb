# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170223154536) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.text     "body",             null: false
    t.string   "commentable_type", null: false
    t.integer  "commentable_id",   null: false
    t.integer  "parent_id"
    t.integer  "author_id",        null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["author_id"], name: "index_comments_on_author_id", using: :btree
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id", using: :btree
    t.index ["parent_id"], name: "index_comments_on_parent_id", using: :btree
  end

  create_table "friendships", force: :cascade do |t|
    t.integer  "friender_id",                 null: false
    t.integer  "receiver_id",                 null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.boolean  "completed",   default: false, null: false
    t.index ["friender_id"], name: "index_friendships_on_friender_id", using: :btree
    t.index ["receiver_id"], name: "index_friendships_on_receiver_id", using: :btree
  end

  create_table "likes", force: :cascade do |t|
    t.integer  "liker_id",    null: false
    t.integer  "likeable_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["likeable_id"], name: "index_likes_on_likeable_id", using: :btree
    t.index ["liker_id"], name: "index_likes_on_liker_id", using: :btree
  end

  create_table "posts", force: :cascade do |t|
    t.integer  "author_id",    null: false
    t.text     "body",         null: false
    t.integer  "wall_user_id", null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["author_id"], name: "index_posts_on_author_id", using: :btree
    t.index ["wall_user_id"], name: "index_posts_on_wall_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",                 null: false
    t.string   "fname",                    null: false
    t.string   "lname",                    null: false
    t.string   "password_digest",          null: false
    t.string   "session_token",            null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "birthday"
    t.string   "relationship"
    t.string   "work"
    t.string   "where"
    t.string   "from"
    t.string   "school"
    t.string   "profile_pic_file_name"
    t.string   "profile_pic_content_type"
    t.integer  "profile_pic_file_size"
    t.datetime "profile_pic_updated_at"
    t.string   "cover_photo_file_name"
    t.string   "cover_photo_content_type"
    t.integer  "cover_photo_file_size"
    t.datetime "cover_photo_updated_at"
    t.index ["fname"], name: "index_users_on_fname", using: :btree
    t.index ["lname"], name: "index_users_on_lname", using: :btree
    t.index ["session_token"], name: "index_users_on_session_token", using: :btree
    t.index ["username"], name: "index_users_on_username", using: :btree
  end

end
