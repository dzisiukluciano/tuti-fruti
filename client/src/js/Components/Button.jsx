import React from 'react';

function Button(props) {

  const styleBtn= {
    backgroundColor: props.background,
  }
  return(
    <input type="button" value={props.value}  style={styleBtn} onClick={props.onClick}/>
  )
}

export default Button;
