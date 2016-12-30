import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import Style from './RoomList.css';
import NewRoomForm from  "../NewRoomForm/NewRoomForm.jsx";
import Room from  "../Room/Room.jsx";

export default class RoomList extends React.Component{

  constructor(){
    super();
    this.state = {
      new : false,
      roomList : []
    }
  }

  componentWillMount(){
    var self = this;
    $.ajax({
            url: 'http://192.168.0.105:3000/getRoomsList',
            success: function(res,status){
                self.setState({
                  roomList : res
                });
            },
            error:function(jqXHR,textStatus,Thrown){
              console.log("error",textStatus,Thrown,jqXHR);
            }
          });

    this.props.socket.on("updateGameRooms",function(msg){
        console.log("event upgrade: ",msg);
        this.setState({
          roomList : msg
        });
    }.bind(this));
  }

  renderRooms(){
    var self = this;
    if(self.state.roomList.length > 0)
    {
      var room_array = self.state.roomList;
       return room_array.map(function(item,i){
        return (
          <Room key={i} index={i} name={item.name} enterRoom={self.props.enterRoom}/>
        );
      });
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
          {this.renderRooms()}
        </div>
      </div>
    )
  }
}
