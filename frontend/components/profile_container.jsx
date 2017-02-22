import React from 'react';
import {router, Router, hashHistory, withRouter} from 'react-router';
import {connect} from 'react-redux';
import {fetchProfile} from '../actions/user_actions';
import {fetchFriends, deFriend, confirmRequest, sendRequest} from '../actions/friends_actions';
import NavBar from './navbar_container';
import PostList from './postlist_container';

const findFriendship = (state) => {
  if (!state.friendships) {return;}
  let value = null;
  Object.keys(state.friendships).forEach(id => {
    if (state.session.currentUser.id === state.friendships[id].receiver_id ||
        state.session.currentUser.id === state.friendships[id].friender_id) {
      value = state.friendships[id];
    }
  });
  return value;
};

const buttonDecider = (friendship, state, ownProps) => {
  if (!ownProps) {return;}
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

  const mapStateToProps = (state, ownProps) => ({
    currentUser: state.session.currentUser,
    user: state.user,
    posts: Object.keys(state.posts).map(id => state.posts[id]),
    friendships: state.friendships,
    buttonText: buttonDecider(findFriendship(state), state, ownProps),
    currentFriendship: findFriendship(state)
  });

  const mapDispatchToProps = dispatch => ({
    fetchProfile: id => dispatch(fetchProfile(id)),
    // fetchFriends: id => dispatch(fetchFriends(id)),
    deFriend: id => dispatch(deFriend(id)),
    confirmRequest: id => dispatch(confirmRequest(id)),
    sendRequest: id => dispatch(sendRequest(id))
  });

class ProfileContainer extends React.Component {

  constructor(props) {
    super(props);
    this.handleButton = this.handleButton.bind(this);
    this.state = {posts: this.props.posts};
  }

  componentDidMount() {
    this.props.fetchProfile(this.props.params.id).then(action => {
    window.scrollTo(0, 100);
    });
  //   this.setState({buttonText: this.props.buttonText}, () =>
  // this.props.fetchProfile(this.props.params.id));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.id !== this.props.params.id) {
      window.scrollTo(0, 100);
      this.props.fetchProfile(this.props.params.id);
    }
  }

  // componentWillUpdate(nextProps, nextState) {
  //   if (nextProps.params.id !== this.props.params.id) {
  //     window.scrollTo(0, 100);
  //     nextProps.fetchProfile(nextProps.params.id);
  //   }
  // }


  handleButton(event) {
      switch(this.props.buttonText) {
        case 'Update Info':
          this.props.router.push(`/users/${currentUser.id}/edit`);
          break;
        case 'Add Friend':
          this.props.sendRequest(this.props.user.id).then(this.setState({buttonText: 'Cancel Request'}));
          break;
        case 'Accept Request':
          this.props.confirmRequest(this.props.currentFriendship.id).then(this.setState({buttonText: 'Remove Friend'}));
          break;
        case 'Cancel Request':
        case 'Remove Friend':
          this.props.deFriend(this.props.currentFriendship.id).then(this.setState({buttonText: 'Add Friend'}));
          break;
        default:
          console.log('BAD ERROR');
      }
  }

  render() {
    const {fname, lname, birthday, work, school, relationship, from, where} = this.props.user;
    if (!this.props.user.fname) {
      return null;
    } else {

      return (
        <div>
          <NavBar />
          <div className='top-wrapper'>
            <img className='cover-photo'></img>
            <div className='pp-floater'>
              <img className='profile-pic'></img>
              <label className='name'>{fname} {lname}</label>
              <div className='profile-btn' onClick={this.handleButton}>{this.props.buttonText}</div>
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
}

export default withRouter (connect(mapStateToProps, mapDispatchToProps)(ProfileContainer));
