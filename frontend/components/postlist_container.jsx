import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {signOut} from '../actions/session_actions';
import Tooltip from './tooltip';
import {fetchNewsfeed} from '../actions/post_actions';
import PostIndexItem from './post_index_item';
import PostForm from './post_form';



const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  posts: Object.keys(state.posts).map(id => state.posts[id])

});

const mapDispatchToProps = dispatch => ({
  fetchNewsfeed: () => dispatch(fetchNewsfeed())
});

class PostList extends React.Component {

  componentDidMount() {
    this.props.fetchNewsfeed();
  }

  render() {
    return (
      <ul className='postlist-wrapper'>
        <li className=''>
          <PostForm wallUserId={this.props.currentUserId} />
        </li>

        {this.props.posts.map( post => {
          return <PostIndexItem key={this.props.posts.indexOf(post)} post={post}/>;
        })}
      </ul>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
