import {combineReducers} from 'redux';
import PostsReducer from './posts_reducer';
import SessionReducer from './session_reducer';
import UsersReducer from './users_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  posts: PostsReducer,
  users: UsersReducer
});

export default RootReducer;
