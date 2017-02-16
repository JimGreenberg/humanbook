import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {signOut} from '../actions/session_actions';
import Tooltip from './tooltip';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({

});

class PostList extends React.Component {
  render() {
    return (
      <div className='postlist-wrapper'>

      </div>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
