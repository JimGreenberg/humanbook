import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {placeTooltip} from './tooltip';
import {receiveComment, removeComment} from '../actions/comments_actions';

  const mapStateToProps = (state, ownProps) => {
    let comment = ownProps.comment ||
      { body: "",
        author_id: state.session.currentUser.id,
        parent_id: ownProps.parent_id,
        commentable_id: ownProps.commentable_id };

    return {comment, currentUser: state.session.currentUser};
  };

  const mapDispatchToProps = (dispatch, ownProps) => {
    const action = ownProps.formType === "new" ? createComment : updateComment;
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
  }

  componentWillMount() {
    if (!this.props.comment) {return null;}
    this.state = this.props.comment;
  }

  update(event) {
    this.setState({body: event.currentTarget.value});
  }

  success() {
    return this.props.formType === 'new' ? () => this.setState({body: ""}) : this.props.handleEdit;
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.action(this.state).then(this.success());
  }

  render() {
    return(
      <form className='comment-form' onSubmit={this.handleSubmit}>
        <img src={this.props.currentUser.profile_pic_url}/>
        <input type='text'
          onChange={this.update}
          value={this.state.body}
          placeholder={
            `Write a
            ${this.props.formType === 'new' ?
            'comment' : 'reply'}`
          }
        />
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
