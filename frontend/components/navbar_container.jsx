import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {signOut} from '../actions/session_actions';
import {placeTooltip} from './tooltip';
import Search from './search';
import NavDropdown from './navbar_dropdown';


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
    this.redirectToProfile = this.redirectToProfile.bind(this);
    this.toggleFlag = this.toggleFlag.bind(this);
    this.state = {ttFlag: false, tab: ""};
  }

  redirectToHome() {
    this.props.router.push('/');
  }

  redirectToProfile() {
    let id = this.props.currentUser.id;
    this.props.router.push(`/users/${id}`);
  }

  toggleFlag(tab) {
    return () => {
      if (tab === this.state.tab || !this.state.ttFlag) {
        this.setState({ttFlag: !this.state.ttFlag, "tab": tab});
      } else {
        this.setState({"tab": tab});
      }
    };
  }

  render(){
    return (
      <div className="navbar">
        <div className="nav-grp left">
        <img className='logo' onClick={this.redirectToHome} src={window.images.negLogo}/>
          <Search />
        </div>

        <div className="nav-grp right">
          <span className='profile-top-btn' onClick={this.redirectToProfile}>
            <img className='profile-micro' src = {this.props.currentUser.profile_pic_url} />
              <label>{this.currentUser.fname}</label>
          </span>
          <span className='home-top-btn' onClick={this.redirectToHome}>
            <label>Home</label>
          </span>

          {placeTooltip(<NavDropdown currentUser={this.currentUser} tab={this.state.tab}/>,"nav-tt card",'',this.state.ttFlag)}
          <i onClick={this.toggleFlag('friends')} className='fa fa-users'></i>
          <i onClick={this.toggleFlag('notifs')} className="fa fa-globe"></i>

          <button className="nav-button" onClick={this.props.signOut.bind(this)}>Log Out</button>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
