import React from 'react';

export default class Game extends React.Component{

  render(){
    return(
      <div>
        HOLA MUNDO SOY EL FRAME DEL GAME
        {console.log(this.props.socket)}
        {console.log(this.props.enterRoom)}//should be undefined
        {console.log(this.props.room)}
      </div>
    );
  }
}
