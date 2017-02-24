import React from 'react';
import {fetchAllUsers} from '../actions/user_actions';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {placeTooltip} from './tooltip';


  const mapStateToProps = state => {

    return {currentUser: state.session.currentUser,
            users: state.search.users};
};

  const mapDispatchToProps = dispatch => ({
    fetchAllUsers: () => dispatch(fetchAllUsers())
  });

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: ''
    };
    this.selectName = this.selectName.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  handleInput(event) {
    this.setState({inputVal: event.currentTarget.value});
  }

  matches() {
    const matches = [];
    if (this.state.inputVal.length === 0) {
      return null;
    }

    Object.keys(this.props.users).forEach(id => {
      let fsub = this.props.users[id].fname.slice(0, this.state.inputVal.length);
      if (fsub.toLowerCase() === this.state.inputVal.toLowerCase()) {
        matches.push(id);
      }
      let lsub = this.props.users[id].lname.slice(0, this.state.inputVal.length);
      if (lsub.toLowerCase() === this.state.inputVal.toLowerCase()) {
        matches.push(id);
      }
    });

    if (matches.length === 0) {
      return null;
    }

    return matches.map(id => (
      <Link to={`/users/${id}`}>
        <img className='pp-mini' src={this.props.users[id].profile_pic_url}/>
        <p>{`${this.props.users[id].fname} ${this.props.users[id].lname}`}</p>
      </Link>
    ));
  }

  selectName(event) {
   let name = event.currentTarget.innerText;
   this.setState({inputVal: name});
 }

  render() {
    return (
      <div className='search-wrapper'>
        <input
          type='text'
          className='search-bar'
          placeholder='Search Humanbook'
          onChange={this.handleInput}
          value={this.state.inputVal}/>
        <div className={this.matches() ? 'search-results':'hidden'}>
          {this.matches()}
        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
