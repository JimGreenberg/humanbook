import React from 'react';

export default (props) => (
  <div className={props.tooltipClassName}>
    {props.tooltipMessage}
    <div className='tt-button' onClick={props.callback}>{props.buttonText}</div>
    <div className='tt-nib'></div>
  </div>
);
