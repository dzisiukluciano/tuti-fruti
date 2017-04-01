import React from 'react';
import Style from './Waiting.css';

export default class Waiting extends React.Component{

  constructor(){
    super();
  }

  componentDidMount(){
    var self = this;
    self.props.socket.on('everybodyFinishedWaiting',function(){
      console.log('everybody finished waiting');
      self.props.startGame();
      self.props.endPhase();
    });
  }

  componentWillUnmount(){
    this.props.socket.off('everybodyFinishedWaiting');
  }

  setWaitingFinished(){
    this.props.socket.emit('setWaitingFinished',{
        user: sessionStorage.getItem('username'),
        room: this.props.room,
    });
  }

  render(){

    let playerStates =   this.props.players.map(function(player,i){
                          let stateClass = 'player-state-state'
                          if(player.state != 'waiting')
                            stateClass = 'player-state-state ready'

                          return (
                            <div className="player-state" key={i}>
                              <div className="player-state-name">{player.name}</div>
                              <div className={stateClass}></div>
                            </div>
                            );
                          });

    return(
      <div className="waiting-div">
        <div className="waiting-title">
          <div className="title-text"><h1>If all you friends are in...</h1></div>
          <div className="title-text"> <p>(If the game starts no more players are admited)</p></div>
          <button className="btn-finish-waiting" onClick={this.setWaitingFinished.bind(this)}>GO</button>
        </div>
        <div className="states">
          {playerStates}
        </div>
    </div>
    );
  }
}
