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

  searchRooms(e){
    if(e.which==13)
    {
      var self = this;
      let user = document.getElementById('iAdmin').value;
      console.log('searching');
      $.ajax({
              url: 'http://192.168.0.103:3000/getRoomsList/'+user,
              success: function(res,status){
                  console.log('res',res);
                  self.setState({
                    roomList : res
                  });
              },
              error:function(jqXHR,textStatus,Thrown){
                console.log("error",textStatus,Thrown,jqXHR);
              }
      });
    }
  }

  renderRooms(){
    var self = this;
    if(self.state.roomList.length > 0){
      var room_array = self.state.roomList;
       return room_array.map(function(item,i){
        return (
          <Room key={item.key} index={item.key} room={item} enterRoom={self.props.enterRoom}/>
        );
      });
    }
    else{
      return (
        <div className="empty">
          Oops, no rooms fund..
        </div>
      )
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
        <div className="seekDiv">
          <div className="seek">
            <input id="iAdmin" onKeyUp={this.searchRooms.bind(this)} placeholder="search a friends room" className="seekInput"></input>
          </div>
        </div>
        <div className="roomList-list scrollbar">
          {this.renderRooms()}
        </div>
      </div>
    )
  }
}
