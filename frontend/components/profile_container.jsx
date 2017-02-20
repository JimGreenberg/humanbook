import React from 'react';
import {router, Router, hashHistory} from 'react-router';
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

  componentDidMount() {
    window.scrollTo(0, 100);
  }
  
  render() {
    return (
      <div>
        <NavBar />
        <div className='top-wrapper'>
          <img className='cover-photo'></img>
          <div className='pp-floater'>
            <img className='profile-pic'></img>
            <label className='name'></label>
          </div>
          <div className='profile-tabs'>

          </div>
        </div>
        <div className='profile-content-wrapper'>
          <div className='sidecards-wrapper'>
            <div className='intro-wrapper'>

            </div>
            <div className='friends-side-wrapper'>

            </div>
          </div>
          <PostList profile={true} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
