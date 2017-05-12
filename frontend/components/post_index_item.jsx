import React from 'react';
import {Link} from 'react-router';
import PostForm from './post_form';
import CommentTree from './comment_tree';
import {placeTooltip} from './tooltip';

export default class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: false, ttFlag: false};
    this.toggleTT = this.toggleTT.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({body: nextProps.body, comments: nextProps.comments});
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
    return <PostForm formType='edit' handleEdit={this.handleEdit} post={this.props.post} />;
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
    this.setState({ttFlag: !this.state.ttFlag});
  }

  render() {
    let {
      id,
      body,
      author,
      wall_owner,
      author_id,
      wall_user_id,
      timestamp,
      comments,
      topLevelComments
    } = this.props.post;
    const postToLabel = author_id === wall_user_id ? 'hidden' : 'name-label';
    if (!comments) { comments = []; }
    return(
      <li>
        <div className='post-item-wrapper card'>
          <div className='label-wrapper'> 
            <Link to= {`users/${author_id}`}>
              <img className='pp-mini' src={author.profile_pic_url}/>
            </Link>

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

            <div className={this.props.currentUser.id === author.id ? 'tt-wrapper' : 'hidden'}>
              <i className='fa fa-angle-down' onClick={this.toggleTT} />
              {placeTooltip(this.ttContents(), 'post-tt', this.state.ttFlag)}
            </div>
          </div>

          <br/>

          <div className='post-body'>
            {this.bodyMaker()}
          </div>
        </div>

        <CommentTree
          topLevelComments={topLevelComments}
          postId={id}
          comments={comments}/>
      </li>
    );

  }
}
