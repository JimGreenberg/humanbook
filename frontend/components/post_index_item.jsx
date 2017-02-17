import React from 'react';
import { Link, hashHistory } from 'react-router';
import {connect} from 'react';

export default class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    debugger
    const {body, author, wall_owner, author_id, wall_user_id, timestamp} = this.props.post;
    if (!author) {return null;}
    const postToLabel = author_id === wall_user_id ? 'hidden' : 'name-label';
    return(
      <li className='post-item-wrapper'>
        <div className='label-wrapper'>
          <img/>
        <div className='name-label-wrapper'>
        <div className='name-label'>
          <span>{`${author.fname} ${author.lname}`}</span>
          <span className={postToLabel}>
            <div className='mini-arrow'/>
            {`${wall_owner.fname} ${wall_owner.lname}`}
          </span>
        </div>
          <small className='timestamp'>{`${timestamp.slice(0,10)} at ${timestamp.slice(11,16)}`}</small>
          </div>
          </div>
        <br/>
        <p className='post-body'>{body}</p>
      </li>
    );

  }
}
