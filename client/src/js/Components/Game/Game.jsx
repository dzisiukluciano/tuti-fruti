import React from 'react';
import Style from './Game.css';
import Chat from '../Chat/Chat.jsx';

export default class Game extends React.Component{

  constructor(){
    super();
    this.state = {
      players:[]
    };
  }

  updatePlayers(msg){
    console.log('playersUpdate ',msg.players);
    this.setState({
                  players:msg.players
                  });
  }

  componentDidMount(){
    var self = this;
    this.props.socket.on('playersUpdate', self.updatePlayers.bind(self));

    this.props.socket.on('admin disconected',function(msg){
      alert('Oh no, ' + msg.name +', the admin, has lost the connection');
      self.props.redirectToRoomSelection();
    });
  }

  componentWillUnmount() {
    var self = this;
    this.props.socket.off('playersUpdate');
  }

  render(){
    return(
      <div className="game-div">
        <div className="gamescreen">

        </div>
        <div className="chatscreen">
          <Chat players={this.state.players} room={this.props.room} socket={this.props.socket}/>
        </div>
      </div>
    );
  }
}
