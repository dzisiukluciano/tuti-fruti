import React from "react";
import Style from './Layout.css';
import $ from 'jquery';
import Login from '../Login/Login.jsx';
import { Router , Route , Link , hashHistory } from 'react-router';
import RoomList from  "../RoomList/RoomList.jsx"

export default class Layout extends React.Component{

  constructor(){
    super();
    var username = 'guest';//prompt('ingrese su nombre de usuario');

    this.state = {
      socket : io('http://192.168.10.198:3000'),
      user : username
    }
  }

  componentDidMount(){
    this.state.socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg.user + ': '+ msg.message));
    });

    this.state.socket.on('alert message', function(msg){
    if (Notification.permission !== "granted")
      Notification.requestPermission();
    else {
      var notification = new Notification('New message',{
        icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
        body: msg.message,
        });
      }
    });
  }

  sendMessage(e){
      let text = $('#m').val();
      let event = {
        message:text,
        user : this.state.user
      }
      this.state.socket.emit('chat message',event);
      $('#m').val('');
  }

  render(){
    return(
    <Router history={hashHistory} >
      <Route path="/" component={ Login }/>
      <Route path="/RoomList" component={ RoomList }/>
    </Router>
    );
  }

}
