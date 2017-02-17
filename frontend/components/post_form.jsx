import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import {placeTooltip} from './tooltip';
import {createPost} from '../actions/post_actions';


  const mapStateToProps = state => ({
    currentUserId: state.session.currentUser.id
  });

  const mapDispatchToProps = dispatch => ({
    createPost: post => dispatch(createPost(post))
  });

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {body: "", author_id: this.props.currentUserId, wall_user_id: this.props.wallUserId};
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  update() {
      return event => {
        this.setState({body: event.currentTarget.value});
      };
    }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createPost(this.state).then(() => this.setState({body: ""}))
  }

  render () {
    return (
      <form className='post-item-wrapper' onSubmit={this.handleSubmit}>
        <div className='form-main'>
          <textarea onChange={this.update()} value={this.state.body}>

          </textarea>
        </div>
        <div className="underlay">
          <input type='submit' className='submit' value='Post'/>
        </div>
      </form>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));
