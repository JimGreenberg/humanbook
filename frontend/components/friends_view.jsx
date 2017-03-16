import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

const FriendsView = ({friends}) => {
  const friendTiles = (friends) => {
    if (!friends) {return;}
    const arr = [<div>Friends</div>];
    let keys = Object.keys(friends);
    for (var i = 0; i < keys.length; i++) {
      arr.push(
        <li key={i}>
        <Link className='friend-tile' to= {`/users/${[keys[i]]}/`}>

          <label className='friend-tile-name'>
            {`${friends[keys[i]].fname} ${friends[keys[i]].lname}`}
          </label>

          <img className='friend-tile-img'
          src={friends[keys[i]].profile_pic_url} />

        </Link>
        </li>
      );
    }
    return <ul className='friend-tiles card'>{arr}</ul>;
  };

  return (friendTiles(friends));
};


export default FriendsView;
