import {RECEIVE_SEARCH} from '../actions/user_actions';

const SearchReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_SEARCH:
      return action.search;
    default:
      return oldState;
  }
};

export default SearchReducer;
