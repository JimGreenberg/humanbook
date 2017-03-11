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

  const mapDispatchToProps = dispatch => ({
    fetchFriends: id => dispatch(fetchFriends(id)),
    confirmRequest: id => dispatch(confirmRequest(id)),
    deFriend: id => dispatch(deFriend(id))
  });

class NavDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.confirmRequest = this.props.confirmRequest.bind(this);
    this.deFriend = this.props.deFriend.bind(this);
  }

  componentWillMount() {
    if (this.props.tab === 'notifs') {
      //lazy fetch posts
    } else if (this.props.tab === 'friends') {
      this.props.fetchFriends(this.props.currentUser.id);
    } else if (this.props.tab === 'messages') {
      //messages implemented later
    }
    this.pickTitle(this.props.tab);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.tab !== this.props.tab) {
      if (newProps.tab === 'notifs') {
        //lazy fetch posts
      } else if (newProps.tab === 'friends') {
        this.props.fetchFriends(newProps.currentUser.id);
      } else if (newProps.tab === 'messages') {
        //messages implemented later
      }
      this.pickTitle(newProps.tab);
    }
  }

  pickTitle(tab) {
    if (tab === 'notifs') {
      this.title = 'Notifications';
    } else if (tab === 'friends') {
      this.title = 'Friend Requests';
    } else if (tab === 'messages') {
      this.title = 'Messages';
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
            <button className='nav-button blue' onClick={() => this.confirmRequest(id) }>Confirm</button>
            <button className='nav-button white' onClick={() => this.deFriend(id) }>Delete Request</button>
          </li>
        );
      }
    });
    return (
      <ul className='friends nav-tt-content'>
        <div className='tt-nib'></div>
        <li>{this.title}</li>
        {listItems}
      </ul>
    );
  }

  messagesContent() {
    return (
      <ul className='messages nav-tt-content'>
        <div className='tt-nib'></div>
        <li>{this.title}</li>
        <li>Messaging coming soon!</li>
      </ul>
    );
  }

  notifsContent() {
    const listItems = [];
    Object.keys(this.props.notifs).slice(-3).map(id => {
      listItems.push(
        <li key={id}>
          <Link to= {`users/${this.props.notifs[id].author_id}`}>
            <img className='pp-mini' src={this.props.notifs[id].author.profile_pic_url}/>
          </Link>
          <Link to= {`users/${this.props.notifs[id].author_id}`}>
            {`${this.props.notifs[id].author.fname} ${this.props.notifs[id].author.lname}`}
          </Link>
          <p>{this.props.notifs[id].body}</p>
        </li>
      );
    });
    return (
      <ul className='notifs nav-tt-content'>
        <div className='tt-nib'></div>
        <li>{this.title}</li>
        {listItems}
      </ul>
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
