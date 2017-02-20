import React from 'react';
import {router, Router, hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {signOut} from '../actions/session_actions';
import {fetchProfile} from '../actions/user_actions';
import NavBar from './navbar_container';
import PostList from './postlist_container';



  const mapStateToProps = state => ({
    user: state.user,
    posts: Object.keys(state.posts).map(id => state.posts[id])
  });

  const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut()),
    fetchProfile: id => dispatch(fetchProfile(id))
  });

class ProfileContainer extends React.Component {

  constructor(props) {
    super(props);
    this.btnState = this.props.params.id === this.props.user.id ?
      'Update Profile' : 'Add Friend';
    this.state = {posts: this.props.posts};
  }

  componentDidMount() {
    this.props.fetchProfile(this.props.params.id);
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
            <div className='profile-btn' content={this.btnState}/>
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
          <PostList className='timeline' profile={true} posts={this.props.posts} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
