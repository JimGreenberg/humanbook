import React from 'react';
import {router} from 'react-router';
import {connect} from 'react-redux';
import {signOut} from '../actions/session_actions';
import NavBar from './navbar_container';
import PostList from './postlist_container';
import PostForm from './post_form';

const mapStateToProps = state => ({
  currentUserId: state.session.currentUser.id
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut())
});

class Newsfeed extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

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
