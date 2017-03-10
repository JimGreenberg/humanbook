import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {placeTooltip} from './tooltip';
import {fetchFriends, confirmRequest, deFriend} from '../actions/friends_actions';
import {fetchTimeline} from '../actions/user_actions';


  const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
    friendships: state.friendships,
    friends: state.friends,
    notifs: state.posts//replace with notifications later
  });

  const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchFriends: () => fetchFriends(ownProps.currentUser.id),
    confirmRequest: id => confirmRequest(id),
    deFriend: id => defriend(id),
    fetchTimeline: () => fetchTimeline(ownProps.currentUser.id)//replace with notifications later
  });

class NavDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.confirmRequest = this.props.confirmRequest.bind(this);
    this.deFriend = this.props.deFriend.bind(this);
  }

  componentDidMount() {
    if (this.props.tab === 'notifs') {
      this.props.fetchTimeline();
    } else if (this.props.tab === 'friends') {
      this.props.fetchFriends();
    } else if (this.props.tab === 'messages') {
      //messages implemented later
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.tab === 'notifs') {
      this.props.fetchTimeline();
    } else if (newProps.tab === 'friends') {
      this.props.fetchFriends();
    } else if (newProps.tab === 'messages') {
      //messages implemented later
    }
  }

  friendsContent() {
    const listItems = [];
    Object.keys(this.props.friendships).map(id => {
      if (!this.props.friendships[id].completed) {
        let userId = this.props.friendships[id].receiver_id === currentUser.id ?
         this.props.friendships[id].friender_id :
         this.props.friendships[id].receiver_id;

        listItems.push(
          <li key={id}>
            <Link to= {`users/${userId}`}>
              <img className='pp-mini' src={this.props.friends[userId].profile_pic_url}/>
            </Link>
            <Link to= {`users/${this.props.friends[userId].id}`}>
              {`${this.props.friends[userId].fname} ${this.props.friends[userId].lname}`}
            </Link>
            <button onClick={() => this.confirmRequest(id) }>Confirm</button>
            <button onClick={() => this.deFriend(id) }>Delete Request</button>
          </li>
        );
      }
    });
    return (
      <div className='friends nav-tt-content'>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }

  messagesContent() {
    return (
      <div className='messages nav-tt-content'>
        <p>Messaging coming soon!</p>
      </div>
    );
  }

  notifsContent() {
    const listItems = [];
    Object.keys({}).map(id => {
      listItems.push(
        <li key={id}>

        </li>
      );
    });
    return (
      <div className='notifs nav-tt-content'>
      <ul>
        {listItems}
      </ul>
      </div>
    );
  }

  render() {
    let content = null;
    if (this.props.tab === 'friends') {
      content = this.friendsContent();
    } else if (this.props.tab === 'messages') {
      content = this.messagesContent();
    } else if (this.props.tab === 'notifs') {
      content = this.notifsContent();
    }
    return(content);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavDropdown);
