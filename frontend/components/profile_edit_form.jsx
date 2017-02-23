import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import {placeTooltip} from './tooltip';
import {updateUser, fetchProfile} from '../actions/user_actions';
import NavBar from './navbar_container';
import merge from 'lodash/merge';


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
    let user = this.props.user;
    let dates =
      {month: "MM",
      day: "DD",
      year: "YYYY"};
    if (user.birthday) {
      dates.month = user.birthday.split(' ')[0];
      dates.day = user.birthday.split(' ')[1];
      dates.year = user.birthday.split(' ')[2];
    }
    this.state = merge({}, user, dates, {profile_pic: "", cpFile: ""});
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePp = this.updatePp.bind(this);
    this.updateCp = this.updateCp.bind(this);
  }

  update(field) {
      return event => this.setState({
        [field]: event.currentTarget.value
      });
    }

  componentDidMount() {
    window.scrollTo(0, 100);
    this.props.fetchProfile(this.props.params.id)
    .then(() => {
      let user = this.props.user;
      let dates =
        {month: "MM",
        day: "DD",
        year: "YYYY"};
      if (user.birthday) {
        dates.month = user.birthday.split(' ')[0];
        dates.day = user.birthday.split(' ')[1];
        dates.year = user.birthday.split(' ')[2];
      }
      this.state = (merge({}, user, dates, {profile_pic: "", cpFile: ""}));
    });
  }

  componentWillReceiveProps(newProps, newState) {
    let user = newProps.user;
    let dates =
      {month: "MM",
      day: "DD",
      year: "YYYY"};
    if (user.birthday) {
      dates.month = user.birthday.split(' ')[0];
      dates.day = user.birthday.split(' ')[1];
      dates.year = user.birthday.split(' ')[2];
    }
    this.setState(merge({}, user, dates, {profile_pic: "", cpFile: ""}));
    }

    updateCp(event) {
      const file = event.currentTarget.files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        this.setState({cover_photo: file, cpURL: fileReader.result});
      };
      if (file) {
        fileReader.readAsDataURL(file);
      }
    }

  updatePp(event) {
    const file = event.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({profile_pic: file, ppURL: fileReader.result});
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
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

  handleSubmit(event) {
    event.preventDefault();
    let birth = [this.state.month, this.state.day, this.state.year].join(' ');
    let formData = new FormData();
    this.setState({birthday: birth}, () => {
      Object.keys(this.state).map(key => {formData.append(`user[${key}]`, this.state[key])})
        this.props.updateUser(formData).then(() => this.props.router.push(`/users/${this.props.user.id}`));
      });
  }

  render () {
    const {work, school, relationship, from, where, birthday} = this.state;

    if (birthday) {
      const month = birthday.split(' ')[0];
      const day = birthday.split(' ')[1];
      const year = birthday.split(' ')[2];
    }

    if (!this.props.user.fname) {
      return null;
    } else {

    return (
      <div>
        <NavBar />
        <div className='top-wrapper'>
          <img className='cover-photo' src={this.props.user.cover_photo_url}></img>
          <div className='pp-floater'>
            <div className='pp-border'><img className='profile-pic' src={this.props.user.profile_pic_url}/></div>
            <label className='name'>{this.props.user.fname} {this.props.user.lname}</label>
          </div>
          <ul className='profile-tabs'>
            <div className='nib about'></div>
              <Link to={`/users/${this.props.user.id}`}><li>Timeline</li></Link>
              <Link to={`/users/${this.props.user.id}/about`}><li>About</li></Link>
              <Link to={`/users/${this.props.user.id}/friends`}><li>Friends</li></Link>
          </ul>
        </div>
        <form className='pef-wrapper card' onSubmit={this.handleSubmit}>
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
                  <option disabled value={"MM"} >Month</option><option value='Jan'>Jan</option><option value='Feb'>Feb</option><option value='Mar'>Mar</option><option value='Apr'>Apr</option><option value='May'>May</option><option value='Jun'>Jun</option><option value='Jul'>Jul</option><option value='Aug'>Aug</option><option value='Sep'>Sep</option><option value='Oct'>Oct</option><option value='Nov'>Nov</option><option value='Dec'>Dec</option>
                </select>
                <select
                  value={this.state.day}
                  id='day'
                  className='dropdown'
                  onChange={this.update('day')}>
                  <option disabled value={"DD"}>Day</option>
                  {this.dayHelper()}
                </select>
                <select
                  value={this.state.year}
                  id='year'
                  className='dropdown'
                  onChange={this.update('year')}>
                  <option disabled value={"YYYY"}>Year</option>
                  {this.yearHelper()}
                </select>
          </div>
          <img src={this.state.ppURL} />
          <label>Profile Pic
          <input type='file' onChange={this.updatePp}/>
          </label>
          <label>Cover Photo
          <input type='file' onChange={this.updateCp}/>
          </label>
          </div>
          <div className='underbar'>
            <input type='submit' className='submit' value='Update Info'/>
          </div>
        </form>
      </div>
    );
  }
}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileEditForm));
