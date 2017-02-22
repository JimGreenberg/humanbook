import React from 'react';
import {router, Router, hashHistory, withRouter} from 'react-router';
import {connect} from 'react-redux';
import {fetchProfile} from '../actions/user_actions';
import {fetchFriends, deFriend, updateRequest, sendRequest} from '../actions/friends_actions';
import NavBar from './navbar_container';
import PostList from './postlist_container';

const findFriendship = (friendships, state) => {
  let value = null;
  Object.keys(friendships).forEach((id) => {
    if (state.session.currentUser.id === friendships[id].receiver_id || state.session.currentUser.id === friendships[id].friender_id) {
      value = friendships[id];
    }
  });
  return value;
};

const buttonDecider = (friendship, state, ownProps) => {
  if (ownProps.params.id == state.session.currentUser.id) {
    return 'Update Info';
  } else if (friendship) {
    if (friendship.completed) {
      return 'Remove Friend';
    } else {
      return friendship.friender_id === state.session.currentUser.id ?
        'Cancel Request' : 'Accept Request';
    }
  } else {
    return 'Add Friend';
  }
};

  const mapStateToProps = (state, ownProps) => {
    debugger
    return{
      currentUser: state.session.currentUser,
      user: state.user,
      posts: Object.keys(state.posts).map(id => state.posts[id]),
      friends: state.friends,
      btnText: buttonDecider(findFriendship(state.friends, state), state, ownProps)
    };
  };

  const mapDispatchToProps = dispatch => ({
    fetchProfile: id => dispatch(fetchProfile(id)),
    fetchFriends: id => dispatch(fetchFriends(id)),
    deFriend: id => dispatch(deFriend(id)),
    updateRequest: id => dispatch(updateRequest(id)),
    sendRequest: id => dispatch(sendRequest(id))

  });

class ProfileContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {posts: this.props.posts, userId: this.props.params.id};
    this.handleButton = this.handleButton.bind(this);
    // this.findFriendship = this.findFriendship.bind(this);
    // this.buttonDecider = this.buttonDecider.bind(this);

  }

  componentDidMount() {
    this.props.fetchProfile(this.props.params.id);
    this.props.fetchFriends(this.props.params.id);
    window.scrollTo(0, 100);
  }


  componentDidUpdate(prevProps) {
    if (prevProps.params.id !== this.props.params.id) {
      this.props.fetchProfile(this.props.params.id);
      this.props.fetchFriends(this.props.params.id);
      window.scrollTo(0, 100);
    }
  }

  handleButton(event) {
      switch(this.props.btnText) {
        case 'Update Info':
          this.props.router.push(`/users/${currentUser.id}/edit`);
          break;
        case 'Add Friend':
          this.props.sendRequest(this.props.user.id);
          break;
        case 'Accept Request':
          this.props.updateRequest(this.props.user.id);
          break;
        case 'Cancel Request':
        case 'Remove Friend':
          this.props.deFriend(this.props.user.id);
          break;
        default:
          console.log('BAD ERROR');
      }
  }

  render() {
    const {fname, lname, birthday, work, school, relationship, from, where} = this.props.user;
    return (
      <div>
        <NavBar />
        <div className='top-wrapper'>
          <img className='cover-photo'></img>
          <div className='pp-floater'>
            <img className='profile-pic'></img>
            <label className='name'>{fname} {lname}</label>
            <div className='profile-btn' onClick={this.handleButton}>{this.props.btnText}</div>
          </div>
          <ul className='profile-tabs'>
            <div className='nib timeline'></div>
            <li >Timeline</li>
            <li >About</li>
            <li >Friends</li>
          </ul>
        </div>
        <div className='profile-content-wrapper'>
          <div className='sidecards-wrapper'>
            <div className='intro-wrapper card'>
              <div className='sidecard-title'>
                <img></img>
                <h2>Intro</h2>
              </div>
              <ul>
                <li><div className='icon-nano'></div>Studied at <p>{school}</p></li>
                <li><div className='icon-nano'></div>Works at <p>{work}</p></li>
                <li><div className='icon-nano'></div>Lives in <p>{where}</p></li>
                <li><div className='icon-nano'></div>Relationship status: <p>{relationship}</p></li>
                <li><div className='icon-nano'></div>From <p>{from}</p></li>
                <li><div className='icon-nano'></div>Born on <p>{birthday}</p></li>
              </ul>
            </div>
            <div className='friends-side-wrapper card'>
              <div className='sidecard-title'>
                <img></img>
                <h2>Friends</h2>
              </div>
              <div>
                <img className='friend-tile'></img>
                <img className='friend-tile'></img>
                <img className='friend-tile'></img>
                <img className='friend-tile'></img>
                <img className='friend-tile'></img>
                <img className='friend-tile'></img>
                <img className='friend-tile'></img>
                <img className='friend-tile'></img>
                <img className='friend-tile'></img>
              </div>
            </div>
          </div>
          <PostList className='timeline' profile={true} posts={this.props.posts} />
        </div>
      </div>
    );
  }
}

export default withRouter (connect(mapStateToProps, mapDispatchToProps)(ProfileContainer));
