import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {signOut} from '../actions/session_actions';

const mapStateToProps = ({session}) => ({
  currentUser: session.currentUser
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut())
});

class Greeting extends React.Component {

  isSignedIn() {
    return !!this.props.currentUser;
  }

  yesSignedIn() {
    return(
      <div className='greeting'>
        <h2 className='welcome-text'>Welcome, {this.props.currentUser.username}</h2>
        <button className="logout-button" onClick={this.props.signOut}>Log Out</button>
      </div>
    );
  }

  noSignedIn() {
    return(
      <div className='greeting'>
        <Link to="/login">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  }

  render() {
    return(
      <div>
        {this.isSignedIn() ? this.yesSignedIn() : this.noSignedIn()}
      </div>
    );
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Greeting);
