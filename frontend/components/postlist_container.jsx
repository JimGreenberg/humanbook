import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {signOut} from '../actions/session_actions';
import Tooltip from './tooltip';
import {fetchNewsfeed, fetchTimeline, updatePost, deletePost} from '../actions/post_actions';
import PostIndexItem from './post_index_item';
import PostForm from './post_form';

const mapStateToProps = (state, ownProps) => ({
  currentUserId: state.session.currentUser.id,
  posts: Object.keys(state.posts).map(id => state.posts[id])

});

const mapDispatchToProps = (dispatch, ownProps) => {
  let populate = ownProps.profile ? fetchTimeline : fetchNewsfeed;
  return {
    deletePost: id => dispatch(deletePost(id)),
    populate: id => dispatch(populate(id))
  };
};

class PostList extends React.Component {

  componentDidMount() {
    this.props.populate(this.props.params.id);
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
