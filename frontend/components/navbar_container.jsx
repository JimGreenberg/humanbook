import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {signOut} from '../actions/session_actions';
import {placeTooltip} from './tooltip';
import Search from './search';


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
    this.state = {ttFlag: false, last: ""};
  }

  redirectToHome() {
    this.props.router.push('/');
  }

  redirectToProfile() {
    let id = this.props.currentUser.id;
    this.props.router.push(`/users/${id}`);
  }

  toggleFlag(last) {
    return () => {
      if (last === this.state.last || !this.state.ttFlag) {
        this.setState({ttFlag: !this.state.ttFlag});
      } else {
        this.setState({"last": last});
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
          {placeTooltip("CONTENT","nav-tt card",'',this.state.ttFlag)}
          <i onClick={this.toggleFlag('friend')} className='fa fa-users'></i>
          <i onClick={this.toggleFlag('comment')} className='fa fa-comment'></i>
          <i onClick={this.toggleFlag('notif')} className="fa fa-globe"></i>
          <button className="logout-button" onClick={this.props.signOut.bind(this)}>Log Out</button>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
