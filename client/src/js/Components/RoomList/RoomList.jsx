import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import Style from './RoomList.css';
import NewRoomForm from  "../NewRoomForm/NewRoomForm.jsx";
import SeekRoomForm from  "../SeekRoomForm/SeekRoomForm.jsx";
import Room from  "../Room/Room.jsx";

export default class RoomList extends React.Component{

  render(){
    return(
      <div className="roomList">
        <div className="newArea">
          <NewRoomForm enterRoom={this.props.enterRoom}/>
        </div>
        <div className="seekArea">
          <SeekRoomForm joinRoom={this.props.joinRoom} />
        </div>
      </div>
    )
  }
}
