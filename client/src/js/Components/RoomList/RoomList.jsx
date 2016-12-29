import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import Style from './RoomList.css';
import NewRoomForm from  "../NewRoomForm/NewRoomForm.jsx";

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
            url: 'http://192.168.10.198:3000/getRoomsList',
            success: function(res,status){
                console.log("success get:",res);
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
    console.log("renderRooms",this.state.roomList);
    if(this.state.roomList.length > 0)
    {
      var room_array = this.state.roomList;
       return room_array.map(function(item,i){
        return (<div className="roomList-room" key ={i} index={i}>{item.name}</div>);
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
