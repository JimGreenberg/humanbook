import React from 'react';
import CommentForm from './comment_form';
import {Link} from 'react-router';
import merge from 'lodash/merge';

export default class CommentTree extends React.Component {
  render(){
    const {topLevelComments, comments} = this.props;
    const arr = [];
    this.props.topLevelComments.map(id => {
      arr.push(<Comment key={id} currentUser={this.props.currentUser} comment={comments[id]}/>);
      comments[id].child_ids.map(childId => {
        arr.push(<Comment key={childId} currentUser={this.props.currentUser} comment={comments[childId]}/>);
      });
    });
    // this.props.topLevelComments.map(id => {
    //   arr.push(this.makeComment(comments[id]));
    //   comments[id].child_ids.map(childId => {
    //     arr.push(this.makeComment(comments[childId]));
    //   });
    // });

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

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = merge({}, this.props.comment, {editing: false, replying: false});
    this.handleEdit = this.handleEdit.bind(this);
    this.handleReply = this.handleReply.bind(this);
  }

  makeBody(body) {
    return this.state.editing ?
    <CommentForm
      className={this.state.editing ? 'edit comment-form' : 'hidden'}
      comment={this.props.comment}
      handleEdit={this.handleEdit}/> :
    <p>{body}</p>;
  }

  handleEdit() {
    this.setState({editing: !this.state.editing});
  }

  handleReply() {
    this.setState({replying: !this.state.replying});
  }

  render() {

    const {body, parent_id, author, timestamp, child_ids, commentable_id, commentable_type, id} = this.props.comment;
    const commentableId = commentable_id;
    const parentId = parent_id;
    const type = !!parentId ? 'child' : 'parent';

    return(
      <div className={`comment ${this.props.type}`}>
        <Link to= {`users/${author.id}`}>
          <img className='pp-mini' src={author.profile_pic_url}/>
        </Link>
        <div>
        <div className='first-line'>
          <Link to= {`users/${author.id}`}>{`${author.fname} ${author.lname}`}</Link>
          {this.makeBody(body)}
          <div className={this.props.currentUser.id === author.id ? 'tt-wrapper' : 'hidden'}>
            <i className='fa fa-pencil'
              onClick={() => this.setState({editing: !this.state.editing})} />
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
}
