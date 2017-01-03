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
    this.props.socket.on('playerJoined', function(msg){
      console.log(msg.players);
    });
  }

  emitSomething(){
    this.props.socket.emit('something',{room:this.props.room});
  }

  render(){
    return(
      <div className="game-div">
        <div className="gamescreen">
          {this.joinRoom()}
        </div>
        <div className="chatscreen">
          <Chat room={this.props.room} socket={this.props.socket}/>
        </div>
      </div>
    );
  }
}
