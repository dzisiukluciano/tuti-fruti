import React from 'react';
import Style from './Game.css';
import Chat from '../Chat/Chat.jsx';
import Waiting from '../Waiting/Waiting.jsx';
import Letter from '../Letter/Letter.jsx';
import Round from '../Round/Round.jsx';
import Points from '../Points/Points.jsx';

export default class Game extends React.Component{

  constructor(){
    super();
    this.state = {
      phase: 'waiting',
      players:[],
    };
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
    this.props.socket.off('admin disconected');
  }

  updatePlayers(msg){
    console.log('playersUpdate ',msg.players);
    this.setState({
                  players:msg.players
                  });
   console.log('playersUpdate OK');
  }

  render(){

    let renderState;
    switch(this.state.phase){
      case('waiting') :
        renderState = (<Waiting socket={this.props.socket} room={this.props.room} players={this.state.players} />);
        break;
      case('letter') :
        renderState = (<Letter/>);
        break;
      case('round') :
        renderState = (<Round/>);
        break;
      case('points'):
        renderState = (<Points/>)
    }

    return(
      <div className="game-div">
        <div className="gamescreen">
          {renderState}
        </div>
        <div className="chatscreen">
          <Chat players={this.state.players} room={this.props.room} socket={this.props.socket}/>
        </div>
      </div>
    );
  }
}
