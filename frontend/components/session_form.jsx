import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {signIn, signUp, signOut} from '../actions/session_actions';



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
      <div>
        {this.props.errors}
        <form onSubmit={this.handleSubmit}>
          <label>Email or Phone
            <input
              type="username"
              value={this.state.username}
              onChange={this.update("username")}/>
          </label>
          <label>Password
            <input
              type="password"
              value={this.state.password}
              onChange={this.update("password")}/>
          </label>
          <input
            type="submit"
            value="Log In"/>
          <input
            type="submit"
            value="Demo"/>
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
