import React from 'react';
import CommentForm from './comment_form';
import {Link} from 'react-router';
import merge from 'lodash/merge';
import Comment from './comment';

const CommentTree = ({topLevelComments, comments, postId}) => {
    const arr = [];
    topLevelComments.map(id => {
      arr.push(<Comment key={id} comment={comments[id]}/>);

      comments[id].child_ids.map(childId => {
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

export default CommentTree;
