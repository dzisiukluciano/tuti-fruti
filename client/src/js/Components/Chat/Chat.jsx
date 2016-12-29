import React from 'react';

export default class Chat extends React.Component{

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
  }
}
