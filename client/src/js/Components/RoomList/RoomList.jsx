import React from 'react';
import Style from './RoomList.css';
import { Link } from 'react-router';
import NewRoomForm from  "../NewRoomForm/NewRoomForm.jsx";

export default class RoomList extends React.Component{

  constructor(){
    super();
    this.state = {
      new : false
    }
  }

  closeForm(e){
    this.setState({
      new : false
    });
  }

  openForm(e){
    this.setState({
      new : true
    });
  }

  render(){

  let newForm = "";
      if(this.state.new)
        newForm =  <NewRoomForm close={this.closeForm.bind(this)} socket={this.props.socket}/>


    return(
      <div className="roomList">
        {newForm}
        <button className="roomList-newRoom" onClick={this.openForm.bind(this)}>New Room</button>
        <div className="roomList-list scrollbar">
          <div className="roomList-room" key ={1} index={1}>THIS IS A ROOM</div>
        </div>
      </div>
    )
  }
}
