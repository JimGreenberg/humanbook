import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {signOut} from '../actions/session_actions';
import Tooltip from './tooltip';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: id => dispatch(fetchPosts(id))
});

class PostList extends React.Component {

  componentDidMount() {
    this.props.fetchPosts(this.props.currentUser.id);
  }

  render() {
    return (
      <div className='postlist-wrapper'>

      </div>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
