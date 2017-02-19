import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import App from './app';
import SessionForm from './session_form';
import ProfileContainer from './profile_container'

const Root = ({store}) => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}/>
        <Route path="/users/:id" component={ProfileContainer} onEnter={_ensureLoggedIn} />
        <Route path="/login" component={SessionForm} onEnter={_redirectIfLoggedIn} />
    </Router>
  </Provider>
);

const _redirectIfLoggedIn = (nextState, replace) => {
  const currentUser = store.getState().session.currentUser;
  if (currentUser) {
    replace('/');
  }
}

const _ensureLoggedIn = (nextState, replace) => {
  const currentUser = store.getState().session.currentUser;
  if (!currentUser) {
    replace('/');
  }
};

export default Root;
