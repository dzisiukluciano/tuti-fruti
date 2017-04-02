import React from 'react';
import Style from './Main.css';
import Game from '../Game/Game.jsx';
import RoomList from '../RoomList/RoomList.jsx';
import { hashHistory } from 'react-router';

export default class Main extends React.Component{


  constructor(){
    super();
  }

  enterRoom(room){
    if(room != null){
    //  this.props.socket.emit('addGameRoom',room);//wait for callback
    }
  }

  joinRoom(room){
    if(room != null){
    //  this.props.socket.emit('joinRoom',{
//    user: sessionStorage.getItem('username'),
  //      room : room,
    //  });
    }
  }

  redirectToRoomSelection(){
    console.log('redirectToRoomSelection');
    this.setState({
      room:null,
      playing:false,
    });
    hashHistory.replace('/RoomList');
    console.log('redirectToRoomSelection OK');
  }

  roomSelection(){
  //  this.props.socket.emit('leaveRoom',{
  //    user : sessionStorage.getItem('username'),
  //    room : this.state.room
  //  });
    this.redirectToRoomSelection();
  }

  logout(){
  //  this.props.socket.disconnect();
    hashHistory.replace('/');
  }

  startGame(){
    let room = this.state.room;
    room.state = 'started';

    this.setState({room:room});
    //this.props.socket.emit('roomStarted',{room:room});

  }

  render(){
    var self = this;

    var childrenWithProps = React.Children.map(this.props.children, function(child) {
        if(self.state.playing){
            //Game with props
            return React.cloneElement(child,{socket:self.props.socket , alphabet:self.props.alphabet , room:self.state.room , redirectToRoomSelection:self.redirectToRoomSelection.bind(self) , startGame:self.startGame.bind(self)})
        }
        else{
          //RoomList with props
          return React.cloneElement(child, { socket: self.props.socket , enterRoom:self.enterRoom.bind(self), joinRoom:self.joinRoom.bind(self)});
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
