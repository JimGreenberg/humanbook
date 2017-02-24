import {combineReducers} from 'redux';
import PostsReducer from './posts_reducer';
import SearchReducer from './search_reducer';
import SessionReducer from './session_reducer';
import UsersReducer from './users_reducer';
import FriendsReducer from './friends_reducer';
import FriendshipsReducer from './friendships_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  posts: PostsReducer,
  user: UsersReducer,
  friendships: FriendshipsReducer,
  friends: FriendsReducer,
  search: SearchReducer
});

export default RootReducer;
