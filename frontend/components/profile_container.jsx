import React from 'react';
import {router} from 'react-router';
import {connect} from 'react-redux';
import {signOut} from '../actions/session_actions';
import NavBar from './navbar_container';
import PostList from './postlist_container';
import PostForm from './post_form';


  const mapStateToProps = state => ({
    currentUser: state.session.currentUser
  });

  const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut())
  });

class ProfileContainer extends React.Component {
  render() {

    return (
      <div>
        <NavBar />
        <PostList profile={true} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
