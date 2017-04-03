import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {signOut} from '../actions/session_actions';
import SessionForm from './session_form';
import SignUpForm from './signup_form';
import Newsfeed from './newsfeed_container';
import {placeTooltip} from './tooltip';


const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  errors: state.session.errors

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
                <i className='fa fa-user'/>
                <p>See photos and updates</p>
                <small>from friends in News Feed.</small>
              </li>
              <li>
                <a href='http://www.github.com/JimGreenberg/humanbook' target='_blank'>
                  <i className='fa fa-github'/>
                  <p>Click here</p>
                  <small>to check out the repo for this project</small>
                </a>
              </li>
              <li>
                <a href='http://www.jim-greenberg.com' target='_blank'>
                  <i className='fa fa-id-card'/>
                  <p>Click here</p>
                  <small>to visit my portfolio online</small>
                </a>
              </li>
            </ul>
          </div>

          <SignUpForm />
        </div>
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
)(MainSplash);
