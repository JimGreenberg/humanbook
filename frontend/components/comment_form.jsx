import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {placeTooltip} from './tooltip';
import {createComment, updateComment} from '../actions/comments_actions';

  const mapStateToProps = (state, ownProps) => {
    let comment = ownProps.comment ||
      { body: "",
        author_id: state.session.currentUser.id,
        parent_id: ownProps.parentId,
        commentable_id: ownProps.commentableId,
        commentable_type: 'Post'};

    return {comment, currentUser: state.session.currentUser};
  };

  const mapDispatchToProps = (dispatch, ownProps) => {
    const action = ownProps.formType !== "edit" ? createComment : updateComment;
    return {
      action: post => dispatch(action(post))
    };
  };

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.comment;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.success = this.success.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    if (!this.props.comment) {return null;}
    this.state = this.props.comment;
  }

  update(event) {
    this.setState({body: event.currentTarget.value});
  }

  success() {
    if (this.props.formType === 'edit') {
      return this.props.toggleEdit;
    } else if (this.props.formType === 'reply') {
      return this.props.toggleReply;
    } else {
      return () => this.setState({body: ""});
    }
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.action(this.state).then(this.success());
  }

  render() {
    return(
      <form className={`${this.props.formType} comment-form`} onSubmit={this.handleSubmit}>
        <img className= 'pp-mini' src={this.props.currentUser.profile_pic_url}/>
        <input type='text'
          onChange={this.update}
          value={this.state.body}
          placeholder={
            `Write a ${!this.props.parent_id ? 'comment' : 'reply'}...`}/>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
