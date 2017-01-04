import React from 'react';
import Style from './Game.css';
import Chat from '../Chat/Chat.jsx';

export default class Game extends React.Component{

  componentDidMount(){
    var self = this;
    this.props.socket.on('playersUpdate', function(msg){
      console.log(msg.players);
    });

    this.props.socket.on('admin disconected',function(msg){
      alert('Oh no, ' + msg.name +', the admin, has lost the connection');
      self.props.redirectToRoomSelection();
    });
  }

  render(){
    return(
      <div className="game-div">
        <div className="gamescreen">

        </div>
        <div className="chatscreen">
          <Chat room={this.props.room} socket={this.props.socket}/>
        </div>
      </div>
    );
  }
}
