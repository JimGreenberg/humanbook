import React from 'react';
import {router} from 'react-router';
import {connect} from 'react-redux';
import {signOut} from '../actions/session_actions';
import NavBar from './navbar_container';
import PostList from './postlist_container';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut())
});

class Newsfeed extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <PostList />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Newsfeed);
