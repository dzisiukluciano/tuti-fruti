import React from 'react';

export default class Game extends React.Component{

  render(){
    return(
      <div>
        HOLA MUNDO SOY EL FRAME DEL GAME
        {console.log("socket ",this.props.socket)}
        {console.log("enterRoom() ",this.props.enterRoom)}//should be undefined
        {console.log("room ",this.props.room)}
      </div>
    );
  }
}
