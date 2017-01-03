import React from 'react';
import Style from './Main.css';
import Game from '../Game/Game.jsx';
import RoomList from '../RoomList/RoomList.jsx';
import { hashHistory } from 'react-router';

export default class Main extends React.Component{

  static defaultProps = {
      socket : io('http://192.168.0.104:3000'),
  };

  constructor(props,defaultProps){
    super(props,defaultProps);

    this.props.socket.emit('addUser',{user:sessionStorage.getItem('username')});

    this.state = {
      playing:false,
      room : null
    }
  }

  enterRoom(room){
    this.setState({
      room:room,
      playing:true
    });
    hashHistory.replace('/Game');
  }

  navigateRoomSelection(){
    this.setState({
      room:null,
      playing:false,
    });
    hashHistory.replace('/RoomList');
  }

  roomSelection(){
    this.props.socket.emit('leaveRoom',{
      user : sessionStorage.getItem('username'),
      room : this.state.room
    });
    this.navigateRoomSelection();
  }

  logout(){
    this.props.socket.emit('logout',{
      user : sessionStorage.getItem('username')
    });
    hashHistory.replace('/');
  }

  render(){
    var self = this;

    var childrenWithProps = React.Children.map(this.props.children, function(child) {
        if(self.state.playing){
            //Game with props
            return React.cloneElement(child,{socket:self.props.socket , room:self.state.room , navigateRoomSelection:self.navigateRoomSelection.bind(self)})
        }
        else{
          //RoomList with props
          return React.cloneElement(child, { socket: self.props.socket , enterRoom:self.enterRoom.bind(self)});
        }
      });

    let room = '';
    let title = (<div className="title">Tuti-Fruti</div>);
      if(this.state.room != null){
          room = (<div className="room">You are playing in room : {this.state.room.name}</div>)
          title = (<div className="title">
                    <button onClick={this.roomSelection.bind(this)} className="btn-roomselection">&#8592; Rooms</button>
                    Tuti-Fruti
                    <button onClick={this.logout.bind(this)} className="btn-logout">Log Out</button>
                  </div>
                );
      }

    return(
      <div className="main-div">
        <div className='main-header'>
          {room}
          {title}
          <div className="username">{sessionStorage.getItem('username')}</div>
        </div>
        <div className='main-body'>
          {childrenWithProps}
        </div>
      </div>
    );
  }
}
