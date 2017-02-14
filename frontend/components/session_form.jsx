import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {signIn, signUp, signOut} from '../actions/session_actions';



const mapStateToProps = (state, ownProps) => ({
  signedIn: Boolean(state.session.currentUser),
  errors: state.session.errors,
  formType: ownProps.location.pathname
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  processForm: user => dispatch((ownProps.location.pathname === '/login') ? signIn(user) : signUp(user))
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
    this.props.processForm(user).then(() => this.props.router.push('/'));
  }

  oppositeLink() {
		return (this.props.formType === "/login") ?
      <Link to="/signup">Signup</Link> :
	    <Link to="/login">Login</Link>;
	}

  render() {

    return(
      <div>
        {this.props.formType[1].toUpperCase()+this.props.formType.slice(2)}
        <nbsp/> here or <nbsp/>
        {this.oppositeLink()}

        {this.props.errors}
        <form onSubmit={this.handleSubmit}>
          <input
            type="username"
            value={this.state.username}
            onChange={this.update("username")}
            placeholder="Username"/>
          <input
            type="password"
            value={this.state.password}
            onChange={this.update("password")}
            placeholder="Password"/>
          <br/>
          <input
            type="submit"
            value="Submit"/>
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
