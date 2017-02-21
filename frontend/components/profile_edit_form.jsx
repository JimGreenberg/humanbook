import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import {placeTooltip} from './tooltip';
import {updateUser, fetchProfile} from '../actions/user_actions';
import NavBar from './navbar_container';


  const mapStateToProps = state => ({
    user: state.user
  });

  const mapDispatchToProps = dispatch => ({
    fetchProfile: (id) => dispatch(fetchProfile(id)),
    updateUser: (user) => dispatch(updateUser(user))
  });



class ProfileEditForm extends React.Component {
  constructor(props){
    super(props);
    this.state = this.props.user;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
      return event => this.setState({
        [field]: event.currentTarget.value
      });
    }

  componentDidMount() {
    this.props.fetchProfile(this.props.params.id);
    window.scrollTo(0, 100);
  }

  componentWillReceiveProps(newProps) {
    this.state = newProps.user;
    this.setState({month: this.state.birthday.split(' ')[0], day: this.state.birthday.split(' ')[1], year:this.state.birthday.split(' ')[2]})
  }

  handleSubmit(event) {
    event.preventDefault();
    let birth = [this.state.month, this.state.day, this.state.year].join(' ');
    this.setState({birthday: birth}, () => {
      this.props.updateUser(this.state).then(this.props.router.push(`/users/${this.state.id}`));
    });
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
    for (var i = 2017; i > 1905; i--) {
      arr.push(<option key={`${i}`} value={`${i}`}>{i}</option>);
    }
    return arr;
  }

  render () {
    //pef stands for profile-edit-form

    const {fname, lname, id, work, school, relationship, from, where, birthday} = this.state;
    if (birthday) {
      const month = birthday.split(' ')[0];
      const day = birthday.split(' ')[1];
      const year = birthday.split(' ')[2];
    }
    return (
      <div>
        <NavBar />
        <div className='top-wrapper'>
          <img className='cover-photo'></img>
          <div className='pp-floater'>
            <img className='profile-pic'></img>
            <label className='name'>{fname} {lname}</label>
          </div>
          <ul className='profile-tabs'>
            <div className='nib about'></div>
              <li >Timeline</li>
              <li >About</li>
              <li >Friends</li>
          </ul>
        </div>
        <form className='pef-wrapper card' onSubmit={this.handleBirthday, this.handleSubmit}>
          <div>
            <label>School</label>
            <input
              type='text'
              placeholder='Type somthing...'
              onChange={this.update('school')}
              value={school}
              ></input>
          </div>
          <div>
            <label>Work</label>
            <input
              type='text'
              placeholder='Type somthing...'
              onChange={this.update('work')}
              value={work}
              ></input>
          </div>
          <div>
            <label>Lives in</label>
            <input
              type='text'
              placeholder='Type somthing...'
              onChange={this.update('where')}
              value={where}
              ></input>
          </div>
          <div>
            <label>Relationship Status</label>
            <input
              type='text'
              placeholder='Type somthing...'
              onChange={this.update('relationship')}
              value={relationship}
              ></input>
          </div>
          <div>
            <label>From</label>
            <input
              type='text'
              placeholder='Type somthing...'
              onChange={this.update('from')}
              value={from}
              ></input>
          </div>
          <div>
          <label>Birthday</label>
          <div className='dob-wrapper'>
                <select
                  value={this.state.month}
                  id='month'
                  className='dropdown'
                  onChange={this.update('month')}>
                  <option disabled value="0" >Month</option><option value='Jan'>Jan</option><option value='Feb'>Feb</option><option value='Mar'>Mar</option><option value='Apr'>Apr</option><option value='May'>May</option><option value='Jun'>Jun</option><option value='Jul'>Jul</option><option value='Aug'>Aug</option><option value='Sep'>Sep</option><option value='Oct'>Oct</option><option value='Nov'>Nov</option><option value='Dec'>Dec</option>
                </select>
                <select
                  value={this.state.day}
                  id='day'
                  className='dropdown'
                  onChange={this.update('day')}>
                  <option disabled value="0">Day</option>
                  {this.dayHelper()}
                </select>
                <select
                  value={this.state.year}
                  id='year'
                  className='dropdown'
                  onChange={this.update('year')}>
                  <option disabled value="0">Year</option>
                  {this.yearHelper()}
                </select>
          </div>
          </div>
          <div className='underbar'>
            <input type='submit' className='submit' value='Update Info'/>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileEditForm));
