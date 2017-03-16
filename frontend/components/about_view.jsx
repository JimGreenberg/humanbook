import React from 'react';
const AboutView = (user) => {
  const {fname, lname, birthday, work, school, relationship, from, where} = user;

  return (
    <ul className='card about-view'>
      <div>About</div>
      <li><i className='fa fa-mortar-board'></i><p>Studied at</p><p>{school}</p></li>
      <li><i className='fa fa-briefcase'></i><p>Works at</p><p>{work}</p></li>
      <li><i className='fa fa-home'></i><p>Lives in</p><p>{where}</p></li>
      <li><i className='fa fa-heart'></i><p>Relationship</p><p>{relationship}</p></li>
      <li><i className='fa fa-map-marker'></i><p>From</p><p>{from}</p></li>
      <li><i className='fa fa-birthday-cake'></i><p>Born on</p><p>{birthday}</p></li>
    </ul>
  );
};
export default AboutView;
