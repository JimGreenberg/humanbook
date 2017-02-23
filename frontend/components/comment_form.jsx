import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {placeTooltip} from './tooltip';
import {createComment, updateComment} from '../actions/comments_actions';

  const mapStateToProps = (state, ownProps) => {
    let comment = ownProps.comment ||
      { body: "",
        authorId: state.session.currentUser.id,
        parentId: ownProps.parent_id,
        commentableId: ownProps.commentable_id };

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
      return this.props.handleEdit;
    } else if (this.props.formType === 'reply') {
      return this.props.handleReply;
    } else {
      return () => this.setState({body: ""})
    }
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.action(this.state).then(this.success());
  }

  render() {
    return(
      <form className={this.props.className} onSubmit={this.handleSubmit}>
        <img className= 'pp-mini' src={this.props.currentUser.profile_pic_url}/>
        <input type='text'
          onChange={this.update}
          value={this.state.body}
          placeholder={
            `Write a ${!this.props.parentId ?
            'comment' : 'reply'}...`
          }
        />
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
