import React from 'react';
import Style from './Room.css';

export default class Room extends React.Component{

  handleCLick(){
    this.props.enterRoom(this.props.index);
  }

  render(){
    return(
      <div className="roomList-room">
          {this.props.name}
          <button className="enter-btn" onClick={this.handleCLick.bind(this)}>play</button>
          <button className="delete-btn">&times;</button>
      </div>
    );
  }
}
