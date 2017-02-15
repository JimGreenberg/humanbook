import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {signOut} from '../actions/session_actions';
import Tooltip from './tooltip';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut())
});

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToHome = this.redirectToHome.bind(this);
  }

  redirectToHome() {
    this.props.router.push('/');
  }

  redirectToProfile() {

  }


  render(){

    return (
      <div className="navBar">
        <img onClick={this.redirectToHome} src={window.images.logoIcon}/>
          <input type='text' className='search-bar' placeholder={this.props.currentUser.username}/>
          <span className='profile-top-btn' ></span>
          <span></span>
          <img></img>
          <img></img>
          <img></img>
          <button className="logout-button" onClick={this.props.signOut}>Log Out</button>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
