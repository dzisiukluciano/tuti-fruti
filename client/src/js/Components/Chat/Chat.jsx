import React from 'react';
import Style from './Chat.css';
import $ from 'jquery';

export default class Chat extends React.Component{

  componentDidMount(){
    this.props.socket.on('receibe message', function(msg){

    let messagesDiv = document.getElementById('messages');
    $(messagesDiv).append($('<div class="chat-message chat-receibed-message">').text(msg.user + ': '+ msg.message));
    $(messagesDiv).scrollTop($(messagesDiv)[0].scrollHeight);

    if (Notification.permission !== "granted")
      Notification.requestPermission();
    else {
      var notification = new Notification('New message',{
        icon: 'http://vignette3.wikia.nocookie.net/adventuretimewithfinnandjake/images/7/7d/Apple.png/revision/latest?cb=20120817164648',
        body: msg.message,
        });
        setTimeout(function(){ notification.close();}, 1000);
      }
    });

  }

  sendMessage(e){
    if(e.type == 'click' || (e.type = 'keyup' && e.which == 13) ){
      let text = $('#m').val();

      if(text.trim() != ''){
        let messagesDiv = document.getElementById('messages');
        let user = sessionStorage.getItem('username');
        let event = {
          room: this.props.room,
          message:text,
          user : user,
        }
        this.props.socket.emit('chat message',event);
        $(messagesDiv).append($('<div class="chat-message chat-own-message">').text(text));
        $(messagesDiv).scrollTop($(messagesDiv)[0].scrollHeight);
        $('#m').val('');
      }
    }
  }

  render(){
    return(
    <div className="chat-div">
      <div className="chat-players">
        <span>Chat with your friends</span>
      </div>
      <div id="messages" className="chat-messagebox">
      </div>
      <div className="chat-newmessage">
          <input id="m" className="chat-message-input" onKeyUp={this.sendMessage.bind(this)}></input>
          <button className="chat-send-button" onClick={this.sendMessage.bind(this)}>Send</button>
      </div>
    </div>
    );
  }
}
