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
      alphabet : null,
      actualLetter : null,
    };
  }

  componentWillReceiveProps(){
    this.setState({
      alphabet : this.props.alphabet,
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
    this.props.socket.off('admin disconected');
  }

  updatePlayers(msg){
    console.log('playersUpdate ',msg.players);
    this.setState({
                  players:msg.players
                  });
   console.log('playersUpdate OK');
  }

  setLetterState(){
    console.log('alphabet after ',this.state.alphabet);
    let random = Math.floor(Math.random() * (this.state.alphabet.length - 1 + 1)) + 1;
    let actualLetter = this.state.alphabet[random];
    let alphabet = this.state.alphabet;
    alphabet.splice(random,1);
    this.setState({
      alphabet : alphabet,
      actualLetter:actualLetter,
      phase:'letter',
    });
    console.log('alphabet before ',this.state.alphabet);
  }

  render(){
    let renderState;
    switch(this.state.phase){
      case('waiting') :
        renderState = (<Waiting socket={this.props.socket} endPhase={this.setLetterState.bind(this)} room={this.props.room} players={this.state.players} startGame={this.props.startGame} />);
        break;
      case('letter') :
        renderState = (<Letter letter={this.state.actualLetter}/>);
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
