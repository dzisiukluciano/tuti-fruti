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

  componentWillMount(){
    var self = this;

    this.props.socket.on('onRoomsFound',function(msg){
      console.log('filteredRooms',msg.rooms);
      self.setState({
        roomList : msg.rooms
      });
    });
  }


  componentWillUnmount() {
    var self = this;
    this.props.socket.off('onRoomsFound');
  }

  searchRooms(e){
    if(e.which==13)
    {
      var self = this;
      let user = document.getElementById('iAdmin').value;
      console.log('searching');

      this.props.socket.emit('findRooms',{user:user});
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
