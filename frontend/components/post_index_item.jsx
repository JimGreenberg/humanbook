import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react';
import PostForm from './post_form';
import {placeTooltip} from './tooltip';

export default class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: false, ttFlag: false};
  }

  handleDelete() {
    this.props.deletePost(this.props.post.id).then(() => null);
  }

  handleEdit() {
    this.setState({editing: !this.state.editing});
  }

  viewBody() {
    return this.props.post.body;
  }

  editBody() {
    return <PostForm formType='edit' handleEdit={this.handleEdit.bind(this)} post={this.props.post} />;
  }

  bodyMaker() {
    return this.state.editing ? this.editBody() : this.viewBody();
  }

  ttContents() {
    return (<div>
      <button onClick={this.handleEdit.bind(this)}>Edit...</button>
      <button onClick={this.handleDelete.bind(this)}>Delete...</button>
    </div>);
  }

  toggleTT() {
    this.setState({[ttFlag]: !ttFlag});
  }

  render() {
    const {body, author, wall_owner, author_id, wall_user_id, timestamp} = this.props.post;
    const postToLabel = author_id === wall_user_id ? 'hidden' : 'name-label';
    return(
      <li className='post-item-wrapper card'>
        <div className='label-wrapper'>
          <img className='pp-mini'/>
        <div className='name-label-wrapper'>
        <div className='name-label'>
          <span>
            <Link to= {`users/${author.id}`}>{`${author.fname} ${author.lname}`}</Link>
          </span>
          <span className={postToLabel}>
            <div className='mini-arrow'/>
            <Link to= {`users/${wall_owner.id}`}>{`${wall_owner.fname} ${wall_owner.lname}`}</Link>
          </span>
        </div>
          <small className='timestamp'>{`${timestamp.slice(0,10)} at ${timestamp.slice(11,16)}`}</small>
          </div>

          </div>
        <br/>
        <div className='post-body'>
          {this.bodyMaker()}

          <div className='tt-wrapper'>
            <img onClick={() => this.setState({ttFlag: !this.state.ttFlag})}/>
            {placeTooltip(this.ttContents(), 'post-tt', 'key', this.state.ttFlag)}
          </div>

        </div>
      </li>
    );

  }
}
