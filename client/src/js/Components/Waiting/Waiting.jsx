import React from 'react';
import Style from './Waiting.css';

export default class Waiting extends React.Component{

  constructor(){
    super();
  }

  componentDidMount(){
    this.props.socket.on('everybodyFinishedWaiting',function(){
      console.log('everybody finished waiting');
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
                          console.log('rendering waiting: ',player.name,'state: ', player.state);
                            return (
                              <div key={i}>
                                <div>{player.name} {player.state}</div>
                              </div>
                            );
                          });

    return(
      <div className="waiting-div">
        {playerStates}
        <button onClick={this.setWaitingFinished.bind(this)}>SET WAITINGFINISHED</button>
    </div>
    );
  }
}
