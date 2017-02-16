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
    this.currentUser = this.props.currentUser;
    this.redirectToHome = this.redirectToHome.bind(this);
  }

  redirectToHome() {
    this.props.router.push('/');
  }

  redirectToProfile() {
    this.props.router.push(`/users/${id}`);
  }


  render(){
    return (
      <div className="navbar">
        <div className="nav-grp left">
        <img className='logo' onClick={this.redirectToHome} src={window.images.negLogo}/>
          <input type='text' className='search-bar' placeholder={this.currentUser.username}/>
        </div>

        <div className="nav-grp right">
          <span className='profile-top-btn'>
            <img className='profile-micro'/>
              <label>{this.currentUser.fname}</label>
          </span>
          <span className='home-top-btn'>
            <label>Home</label>
          </span>
          <img className='friends-top-btn'></img>
          <img className='messages-top-btn'></img>
          <img className='global-top-btn'></img>
          <button className="logout-button" onClick={this.props.signOut}>Log Out</button>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
