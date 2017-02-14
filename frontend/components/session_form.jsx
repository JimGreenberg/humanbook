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
      <div className="mainsplash">
        {this.props.errors}
        <form onSubmit={this.handleSubmit}>
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
            </div>

          <input
            className='button'
            type="submit"
            value="Log In"/>
          <input
            className='button'
            type="submit"
            value="Demo"/>

        </div>
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
