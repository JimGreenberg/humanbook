import React from 'react';

export default (props) => (
  <div className={`${props.tooltipClassName}`}>
    <div className='hidden'></div>
    <div className='tt-content'>
      {props.tooltipMessage}
    </div>
    <div className='underlay'>
      <div className='tt-button' onClick={props.callback}>{props.buttonText}</div>
    </div>
    <div className='tt-nib'></div>
  </div>
);
