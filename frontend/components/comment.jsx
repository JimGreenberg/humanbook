import React from 'react';
import CommentForm from './comment_form';
import {Link} from 'react-router';
import merge from 'lodash/merge';
import {connect} from 'react-redux';
import {deleteComment} from '../actions/comments_actions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  deleteComment: id => dispatch(deleteComment(id)),
});

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: false, replying: false};
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleReply = this.toggleReply.bind(this);
  }

  makeBody(body) {
    return this.state.editing ?
    <CommentForm
      formType={this.state.editing ? 'edit' : 'hidden'}
      comment={this.props.comment}
      toggleEdit={this.toggleEdit}/> :
    <p>{body}</p>;
  }

  toggleEdit() {
    this.setState({editing: !this.state.editing});
  }

  toggleReply() {
    this.setState({replying: !this.state.replying});
  }

  render() {
    const {
      body,
      parent_id,
      author,
      timestamp,
      child_ids,
      commentable_id,
      commentable_type,
      id
    } = this.props.comment;
    const commentableId = commentable_id;
    const nodeType = !!parent_id ? 'child' : 'parent';
    return(
      <div className={`comment ${nodeType}`}>
        <Link to= {`users/${author.id}`}>
          <img className='pp-mini' src={author.profile_pic_url}/>
        </Link>

        <div>
          <div className='first-line'>
            <Link to= {`users/${author.id}`}>{`${author.fname} ${author.lname}`}</Link>
            {this.makeBody(body)}
            <div className={this.props.currentUser.id === author.id ? 'tt-wrapper' : 'hidden'}>
              <i className='fa fa-times'
                onClick={() => this.props.deleteComment(id)} />
              <i className='fa fa-pencil'
                onClick={this.toggleEdit} />
            </div>
          </div>

          <div className='second-line'>
            <a onClick={this.toggleReply}>Reply</a>
            <small className='timestamp'>{`· ${timestamp.slice(0,10)} at ${timestamp.slice(11,16)}`}</small>
          </div>

          <CommentForm
            formType={this.state.replying ? 'reply' : 'hidden'}
            parentId={parent_id || id}
            commentableId={commentableId}
            toggleReply={this.toggleReply}/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
