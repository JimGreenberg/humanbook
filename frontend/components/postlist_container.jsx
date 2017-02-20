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
  currentUserId: state.session.currentUser.id};
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
    return (
      <ul className='postlist-wrapper'>

        {this.props.posts.map( post => {
          return <PostIndexItem
            key={this.props.posts.indexOf(post)}
            post={post}
            deletePost={this.props.deletePost}/>;
        })}

        <PostForm formType='new' wallUserId={this.props.currentUserId} />
      </ul>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));
