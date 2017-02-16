import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {signOut} from '../actions/session_actions';
import SessionForm from './session_form'
import SignUpForm from './signup_form'
import Newsfeed from './newsfeed_container'


const mapStateToProps = ({session}) => ({
  currentUser: session.currentUser,
  errors: session.errors
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut())
});

class MainSplash extends React.Component {

  isSignedIn() {
    return !!this.props.currentUser;
  }

  yesSignedIn() {
    return(
      <Newsfeed />
    );
  }

  noSignedIn() {
    return(
      <div className='mainsplash'>
        <div className='topbar'>
          <img src={window.images.humanbookLogo}/>
          <SessionForm />
        </div>
        <div className='main-wrapper'>
          <div className='fluff-wrapper'>
            <h1>Connect with friends and the <br/> world around you on Humanbook.</h1>
            <ul className='fluff-list'>
              <li>
                <img src={window.images.logoIcon}/>
                <p>See photos and updates</p>
                <small>from friends in News Feed.</small>
              </li>
              <li>
                <img src={window.images.logoIcon}/>
                <p>Share what's new </p>
                <small>in your life on your Timeline.</small>
              </li>
              <li>
                <img src={window.images.logoIcon}/>
                <p>Find more</p>
                <small>of what you're looking for with Facebook Search.</small>
              </li>
            </ul>
          </div>
          <SignUpForm />
        </div>
      </div>
    );
  }
  // <div className='errors'>
  //   {this.props.errors}
  // </div>

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
)(MainSplash);
