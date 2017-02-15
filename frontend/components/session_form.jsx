import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {signIn, signUp, signOut} from '../actions/session_actions';
import Tooltip from './tooltip';


const mapStateToProps = (state, ownProps) => ({
  signedIn: Boolean(state.session.currentUser),
  errors: state.session.errors
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  signIn: user => dispatch(signIn(user))
});

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.disabled = false;
  }

  logInAs(username, password) {
    this.disabled = true;
    this.typeValue(username, "username", function () {
      this.typeValue(password, "password", function () {
        this.props.signIn(this.state).then(() => this.props.router.push('/'));
      }.bind(this));
    }.bind(this));
  }

  typeValue(value, name, cb) {
    if (!value) return cb();
    this.setState({ [name]: this.state[name] + value[0] });
    setTimeout(function () {
      this.typeValue(value.slice(1), name, cb);
    }.bind(this), 75);
  }

  update(field) {
  		return event => this.setState({
  			[field]: event.currentTarget.value
  		});
  	}

  handleSubmit(event) {

    event.preventDefault();
    const user = this.state;
    this.props.signIn(user).then(() => this.props.router.push('/'));
  }

  render() {

    return(
        <form onSubmit={this.handleSubmit}>
          <fieldset disabled={this.disabled}>
          <div className="form-wrapper">

            <div className="field-grp">
            <label>Email or Phone</label>
            <input
              type="username"

              value={this.state.username}
              className="field"
              onChange={this.update("username")}/>
            </div>

            <div className="field-grp">
            <label>Password</label>
            <input
              type="password"

              value={this.state.password}
              className="field"
              onChange={this.update("password")}/>
            <button onClick={() => {this.logInAs("jerry@seinfeld.com", 'asdfasdf');}}>Demo Log In</button>

          </div>

          <input
            className='button'
            type="submit"
            value="Log In"
            />

        </div>
        </fieldset>
        </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
