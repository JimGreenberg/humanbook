import React from 'react';
import CommentForm from './comment_form';
import {Link} from 'react-router';
import merge from 'lodash/merge';
import Comment from './comment';

export default class CommentTree extends React.Component {
  componentWillReceiveProps(newProps) {
    this.forceUpdate();
  }

  render() {
    const {topLevelComments, comments, postId} = this.props;
    const arr = [];
    topLevelComments.forEach(id => {
      arr.push(<Comment key={id} comment={comments[id]}/>);
      
      comments[id].child_ids.forEach(childId => {
        arr.push(<Comment key={childId} comment={comments[childId]}/>);
      });
    });
    return(
      <div className={`comment-tree`}>
        {arr}
        <CommentForm
          className='comment-form'
          parentId={null}
          commentableId={postId}
          formType='comment'/>
      </div>
    );
  }
}
