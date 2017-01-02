import React from 'react';
import Style from './Game.css';
import Chat from '../Chat/Chat.jsx';

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
      <div className="game-div">
        <div className="gamescreen">
          ACA SE RENDERIZA EL CHILD
          {this.joinRoom()}
          <button onClick={this.emitSomething.bind(this)}>EMIT SOMETHIGN (NO TOCAR PORQUE CAE EL SERVERS)</button>
        </div>
        <div className="chatscreen">
          <Chat room={this.props.room} socket={this.props.socket}/>
        </div>
      </div>
    );
  }
}
