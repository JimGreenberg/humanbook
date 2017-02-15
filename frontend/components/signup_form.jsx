import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {signUp} from '../actions/session_actions';
import Tooltip from './tooltip';

const mapStateToProps = state => ({
  errors: state.session.errors
});

const mapDispatchToProps = dispatch => ({
  createAccount: user => dispatch(signUp(user))
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
      day: "",
      month: "",
      year: "",
      sex: ""

    };
    this.tooltipVisible = false;
  }

  update(field) {
      return event => this.setState({
        [field]: event.currentTarget.value
      });
    }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.state;
    this.props.createAccount(user).then(() => this.props.router.push('/'));
  }

  dayHelper() {
    let arr = [];
    for (var i = 0; i < 32; i++) {
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
            <input
              type="text"
              value={this.state.fname}
              className="field"
              placeholder='First Name'
              onChange={this.update("fname")}/>

            <input
              type="text"
              value={this.state.lname}
              className="field"
              placeholder='Last Name'
              onChange={this.update("lname")}/>
          </div>

          <input
            type="username"
            value={this.state.username}
            className="field"
            placeholder='Mobile number or email'
            onChange={this.update("username")}/>

          <input
            type="username"
            value={this.state.usernameTwo}
            className="field"
            placeholder='Re-enter mobile number or email'
            onChange={this.update("usernameTwo")}/>

            <input
              type="password"
              value={this.state.password}
              className="field"
              placeholder='New password'
              onChange={this.update("password")}/>
            <label className='birthday'>Birthday</label>
            <div className='dob-wrapper'>
              <select
                selected
                id='month'
                className='dropdown'>
                <option value="0" >Month</option><option value='Jan'>Jan</option><option value='Feb'>Feb</option><option value='Mar'>Mar</option><option value='Apr'>Apr</option><option value='May'>May</option><option value='Jun'>Jun</option><option value='Jul'>Jul</option><option value='Aug'>Aug</option><option value='Sep'>Sep</option><option value='Oct'>Oct</option><option value='Nov'>Nov</option><option value='Dec'>Dec</option>
              </select>
              <select
                selected
                id='day'
                className='dropdown'>
                <option value="0">Day</option>
                {this.dayHelper()}
              </select>
              <select
                selected
                id='year'
                className='dropdown'>
                <option value="0">Year</option>
                {this.yearHelper()}
              </select>
              <small
                className='question tooltip-container'
                onClick={() => this.setState({ tooltipVisible: !this.state.tooltipVisible })}>
                  Why do I need to provide my birthday?
                </small>
                  <Tooltip
                    tooltipMessage="it's so we know how old you are"
                    tooltipClassName={ this.state.tooltipVisible ? "tooltip" : "hidden" }
                    buttonText="Okay"
                    callback={() => this.setState({ tooltipVisible: !this.state.tooltipVisible })}
                  />
            </div>
            <div className='tuple-wrapper'>
            <label>
              <input
                type='radio'
                name='sex'
                value='Female'
                className='radio'
                />Female
            </label>
              <label>
            <input
                type='radio'
                name='sex'
                value='Male'
                className='radio'
                />Male
            </label>
            </div>
            <small>
              By clicking Create Account, you agree to our Terms and that you have read our
              Data Policy, including our Cookie Use.
              You may receive SMS Notifications from Facebook and can opt out at any time.
            </small>
            <input
              type='submit'
              className='signup-button'
              value='Create Account'/>
      </div>
    </form>
  );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
