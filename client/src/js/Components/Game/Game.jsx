import React from 'react';

export default class Game extends React.Component{

  joinRoom(){
    let msg = {
      user : window.sessionStorage.getItem('username'),
      room : this.props.room
    }
    this.props.socket.emit('joinRoom',msg);
  }

  componentDidMount(){
    this.props.socket.on('somethingCallback', function(){
      console.log('something was emitted to this room');
    });
  }

  emitSomething(){
    this.props.socket.emit('something',{room:this.props.room});
  }

  render(){
    return(
      <div>
        HOLA MUNDO SOY EL FRAME DEL GAME
        {console.log("socket ",this.props.socket)}
        {console.log("room ",this.props.room)}
        {this.joinRoom()}
        <button onClick={this.emitSomething.bind(this)}>EMIT SOMETHIGN</button>
      </div>
    );
  }
}
