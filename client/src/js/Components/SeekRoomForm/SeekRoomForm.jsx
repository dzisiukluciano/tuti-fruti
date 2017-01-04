import React from 'react';
import Style from './SeekRoomForm.css';
import $ from 'jquery';
import Room from '../Room/Room.jsx';

export default class SeekRoomForm extends React.Component{

  constructor(){
    super();
    this.state ={
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
              url: 'http://192.168.0.104:3000/getRoomsList/'+user,
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
          <Room key={item.key} index={item.key} room={item} joinRoom={self.props.joinRoom}/>
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

  render(){
    return(
      <div className="seekRoom">
        <div className="seekDiv">
          <div className="seek">
            <input id="iAdmin" onKeyUp={this.searchRooms.bind(this)} placeholder="search a friends room" className="seekInput"></input>
          </div>
        </div>
        <div className="roomList-list scrollbar">
          {this.renderRooms()}
        </div>
      </div>
    );
  }
}
