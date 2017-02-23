import React from 'react';
import CommentForm from './comment_form';
import {Link} from 'react-router';

export default class CommentTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: false, replying: false};
    this.handleEdit = this.handleEdit.bind(this);
    this.handleReply = this.handleReply.bind(this);
  }

  handleEdit() {
    this.setState({editing: !this.state.editing});
  }

  handleReply() {
    this.setState({replying: !this.state.replying});
  }

  makeComment(comment) {
    const {body, parent_id, author, timestamp, child_ids, commentable_id, commentable_type, id} = comment;
    const commentableId = commentable_id;
    const parentId = parent_id;
    const type = parent_id ? 'child' : 'parent';
    return(
      <div className={`comment ${type}`}>
        <Link to= {`users/${author.id}`}>
          <img className='pp-mini' src={author.profile_pic_url}/>
        </Link>
        <div>
        <div className='first-line'>
          <Link to= {`users/${author.id}`}>{`${author.fname} ${author.lname}`}</Link>
          <p>{body}</p>
          <div className={this.props.currentUser.id === author.id ? 'tt-wrapper' : 'hidden'}>
            <i className='fa fa-pencil'
              onClick={() => this.setState({editing: !this.state.editing})} />
            <CommentForm
              className={this.state.editing ? 'edit comment-form' : 'hidden'}
              comment={comment}
              handleEdit={this.handleEdit}/>
          </div>
        </div>
        <div className='second-line'>
          <a onClick={() => this.setState({replying: !this.state.replying})}>Reply</a>
          <small className='timestamp'>{`· ${timestamp.slice(0,10)} at ${timestamp.slice(11,16)}`}</small>
        </div>
        <CommentForm
          className={this.state.replying ? 'reply comment-form' : 'hidden'}
          parentId={id}
          commentableId={commentableId}
          formType='reply'
          handleReply={this.handleReply}
        />
        </div>
      </div>
    );
  }

  render(){
    const {topLevelComments, comments} = this.props;
    const arr = [];
    this.props.topLevelComments.map(id => {
      arr.push(this.makeComment(comments[id]));
      comments[id].child_ids.map(childId => {
        arr.push(this.makeComment(comments[childId]));
      });
    });

  return(
    <div className={`comment-tree ${arr.length < 1 ? 'hidden' : ''}`}>
      {arr}
      <CommentForm
        className='comment-form'
        parentId={null}
        commentableId={this.props.postId}
        formType='comment'
      />
    </div>
  );
  }
}
