import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {signOut} from '../actions/session_actions';
import Tooltip from './tooltip';
import {fetchNewsfeed, fetchTimeline, updatePost, deletePost} from '../actions/post_actions';
import PostIndexItem from './post_index_item';
import PostForm from './post_form';

const mapStateToProps = (state) => {

  return {
  currentUser: state.session.currentUser,
  posts: Object.keys(state.posts).map(postId => state.posts[postId])};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deletePost: id => dispatch(deletePost(id)),
  };
};

class PostList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const wallUserId = this.props.profile ? this.props.params.id : this.props.currentUser.id;
    return (
      <ul className='postlist-wrapper'>

        {this.props.posts.map( post => {
          if (!post) {return;}
          return <PostIndexItem
            key={post.id}
            post={post}
            deletePost={this.props.deletePost}
            currentUser={this.props.currentUser}/>;
        })}

        <PostForm formType='new' wallUserId={parseInt(wallUserId)} />
      </ul>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));
