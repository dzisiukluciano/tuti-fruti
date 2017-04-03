import React from 'react';
import Style from './Login.scss';
import Main from '../Main/Main.jsx';
import { hashHistory } from 'react-router';



export default class Login extends React.Component{

  constructor(){
    super();

  }

  componentWillMount(){
    this.props.socket.on('usernameTaken',() => {
      console.log('username is alredy taken');
    });

    this.props.socket.on('login',(msg) => {
      console.log('logged in succefull');
      window.sessionStorage.setItem('username',msg.username);
      hashHistory.push("/Main");
    });
  }

  handleLogIn(e){
    if(e.type == 'click' || (e.type = 'keyup' && e.which == 13)){
      let username = document.getElementById('iUser');
      if(username.value != '')
      {
        this.props.socket.emit('tryLogin',{
            username: username.value,
        });
      }
    }
  }

  render(){
    return(
      <div className="login">
        <div className="login-form">
          <div className="login-form-data rainbow">
            <h2 className="">Pick your username</h2>
          </div>
          <div className="login-form-data">
            <input id='iUser' className="" placeholder="username" onKeyUp={this.handleLogIn.bind(this)} type="text"></input>
          </div>
          <div className="login-form-data">
            <button onClick={this.handleLogIn.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
}
