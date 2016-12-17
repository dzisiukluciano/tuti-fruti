import React from "react";
import Style from './Layout.css';
import $ from 'jquery';

export default class Layout extends React.Component{

  constructor(){
    super();
    var username = 'guest';//prompt('ingrese su nombre de usuario');

    this.state = {
      socket : io('http://192.168.0.103:3000'),
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
      <div >
        <ul id="messages"></ul>
        <input id="m" autoComplete="off"/><button type="button" onClick={this.sendMessage.bind(this)}>Send</button>
      </div>
    );
  }

}
