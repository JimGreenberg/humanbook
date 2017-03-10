import React from 'react';
import {router, withRouter} from 'react-router';
import {connect} from 'react-redux';
import {signOut} from '../actions/session_actions';
import NavBar from './navbar_container';
import PostList from './postlist_container';
import PostForm from './post_form';
import {fetchNewsfeed, fetchTimeline, updatePost, deletePost} from '../actions/post_actions';


const mapStateToProps = (state, ownProps) => {

  return{
  currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    signOut: () => dispatch(signOut()),
    fetchNewsfeed: () => dispatch(fetchNewsfeed())
  };
};

class Newsfeed extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchNewsfeed();
  }

  render() {

    return (
      <div className='newsfeed-wrapper'>
        <NavBar />
        <div className='spacer'></div>
        <PostList />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Newsfeed));
