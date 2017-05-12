import React from 'react';

const buttonMaker = (text, callback) => (<div className='tt-button' onClick={callback}>{text}</div>);
const Tooltip = (props) => {
  return(
    <div className={`tooltip ${props.tooltipClassName}`}>
      <div className='hidden'></div>
      <div className='tt-content'>
        {props.tooltipMessage}
      </div>
      <div className='underlay'>
        {!!props.buttonText ? buttonMaker(props.buttonText, props.callback) : <div></div>}
      </div>
      <div className='tt-nib'></div>
    </div>
  );
};

const defaultCallback = () => { this.setState({[visibleFlag]: !visibleFlag}); };

export const placeTooltip = function(message, className, visibleFlag=true, buttonText="", callback=defaultCallback) {
  if (visibleFlag) {
  return (
      <Tooltip
        tooltipMessage={message}
        tooltipClassName={className}
        buttonText={buttonText}
        callback={callback.bind(this)}/>
  );
}};
