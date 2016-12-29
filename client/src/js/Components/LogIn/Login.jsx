import React from 'react';
import Style from './Login.css';
import Main from '../Main/Main.jsx';
import { hashHistory } from 'react-router';

export default class Login extends React.Component{


  handleClick(e){
    let username = document.getElementById('iUser');

    if(username.value != '')
    {
      console.log('username:',username.value);
      window.sessionStorage.setItem('username',username.value);
      hashHistory.push("/Main");
    }
    else {
      username.style.backgroundColor = 'rgba(255,0,0,0.4)';
    }
  }

  render(){
    return(
      <div className="login">
        <div className="login-form">
          <div className="login-form-data">
            <h2 class="login-form-data-h2">Pick a name</h2>
          </div>
          <div className="login-form-data">
            <input id='iUser' className="login-form-data-input" type="text"></input>
          </div>
          <div className="login-form-data">
            <button className="login-form-data-button" type="button" onClick={this.handleClick.bind(this)}><strong>GO</strong></button>
          </div>
        </div>
      </div>
    )
  }
}
