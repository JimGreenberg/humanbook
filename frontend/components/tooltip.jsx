import React from 'react';

export default (props) => {

  const buttonMaker = () => (<div className='tt-button' onClick={props.callback}>{props.buttonText}</div>);

  return(
    <div className={`${props.tooltipClassName} e${props.id}`}>
      <div className='hidden'></div>
      <div className='tt-content'>
        {props.tooltipMessage}
      </div>
      <div className='underlay'>
        {!!props.buttonText ? buttonMaker() : ""}
      </div>
      <div className='tt-nib'></div>
    </div>
  );
};
