import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import {signUp} from '../actions/session_actions';
import {placeTooltip} from './tooltip';
import {receiveErrors} from '../actions/session_actions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  errors: state.session.errors
});

const mapDispatchToProps = dispatch => ({
  createAccount: user => dispatch(signUp(user)),
  receiveErrors: err => dispatch(receiveErrors(err))
});

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      username: "",
      usernameTwo: "",
      password: "",
      sex: "",
      bdayFlag: false,
      fnameFlag: false,
      lnameFlag: false,
      usernameFlag: false,
      usernameTwoFlag: false,
      passwordFlag: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidUpdate(prevProps) {
    Object.keys(this.props.errors).forEach(error => {
      if (prevProps.errors[error] !== this.props.errors[error]) {
        let flag = `${error}Flag`;
        this.setState({[flag]: !!this.props.errors[error]});
      }
    });
  }

  update(field) {
      let flag = `${field}Flag`;
      return event => this.setState({
        [field]: event.currentTarget.value,
        [flag]: false
      });
    }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.state;

    if (this.state.username !== this.state.usernameTwo) {
      this.props.receiveErrors({usernameTwo: "Your re-entered username must match"});
    }
    if (this.props.errors.length !== 0) {
      this.setState({usernameTwo: ""});
    }
    this.props.createAccount(user).then(() => this.props.router.push('/'));
  }

  dayHelper() {
    let arr = [];
    for (var i = 1; i < 32; i++) {
      arr.push(<option key={`${i}`} value={`${i}`}>{i}</option>);
    }
    return arr;
  }

  yearHelper() {
    let arr = [];
    for (var i = 1905; i < 2017; i++) {
      arr.push(<option key={`${i}`} value={`${i}`}>{i}</option>);
    }
    return arr;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

      <div className='signup-wrapper'>
        <h1>Sign Up</h1>
        <h2>It's free and always will be.</h2>
          <div className='tuple-wrapper'>
            <div className='attache-wrapper'>
            <input
              type="text"
              value={this.state.fname}
              className="field"
              placeholder='First Name'
              onChange={this.update("fname")}/>
            {placeTooltip(this.props.errors.fname, "error", "fname", this.state.fnameFlag)}
</div>
<div className='attache-wrapper'>
            <input
              type="text"
              value={this.state.lname}
              className="field"
              placeholder='Last Name'
              onChange={this.update("lname")}/>
            {placeTooltip(this.props.errors.lname, "error", "lname", this.state.lnameFlag)}
          </div>
          </div>
          <div className='attache-wrapper'>
          <input
            type="username"
            value={this.state.username}
            className="field"
            placeholder='Mobile number or email'
            onChange={this.update("username")}/>
          {placeTooltip(this.props.errors.username, "error", "username", this.state.usernameFlag)}
        </div>
        <div className='attache-wrapper'>
          <input
            type="username"
            value={this.state.usernameTwo}
            className="field"
            placeholder='Re-enter mobile number or email'
            onChange={this.update("usernameTwo")}/>
          {placeTooltip(this.props.errors.usernameTwo, "error", "usernameTwo", this.state.usernameTwoFlag)}
        </div>
        <div className='attache-wrapper'>
            <input
              type="password"
              value={this.state.password}
              className="field"
              placeholder='New password'
              onChange={this.update("password")}/>
            {placeTooltip(this.props.errors.password, "error", "password", this.state.passwordFlag)}
          </div>
            <label className='birthday'>Birthday</label>
            <div className='dob-wrapper'>
              <select
                selected
                id='month'
                className='dropdown'
                onChange={this.update('month')}>
                <option value="0" >Month</option><option value='Jan'>Jan</option><option value='Feb'>Feb</option><option value='Mar'>Mar</option><option value='Apr'>Apr</option><option value='May'>May</option><option value='Jun'>Jun</option><option value='Jul'>Jul</option><option value='Aug'>Aug</option><option value='Sep'>Sep</option><option value='Oct'>Oct</option><option value='Nov'>Nov</option><option value='Dec'>Dec</option>
              </select>
              <select
                selected
                id='day'
                className='dropdown'
                onChange={this.update('day')}>
                <option value="0">Day</option>
                {this.dayHelper()}
              </select>
              <select
                selected
                id='year'
                className='dropdown'
                onChange={this.update('year')}>
                <option value="0">Year</option>
                {this.yearHelper()}
              </select>
              <div className='attache-wrapper'>
                <small
                  className='question tooltip-container'
                  onClick={() => this.setState({ bdayFlag: !this.state.bdayFlag })}>
                  Why do I need to provide my birthday?
                </small>
                {placeTooltip("it's so we know how old you are", "mainsplash-tt",'key',this.state.bdayFlag, "Okay", () => this.setState({bdayFlag: !this.state.bdayFlag}))}
            </div>
            </div>
            <div className='tuple-wrapper'>
            <label>
              <input
                type='radio'
                name='sex'
                value='Female'
                onChange={this.update('sex')}
                className='radio'
                />Female
            </label>
              <label>
            <input
                type='radio'
                name='sex'
                value='Male'
                onChange={this.update('sex')}
                className='radio'
                />Male
            </label>
            </div>
            <input
              type='submit'
              className='signup-button'
              value='Create Account'/>
      </div>
    </form>
  );
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpForm));
