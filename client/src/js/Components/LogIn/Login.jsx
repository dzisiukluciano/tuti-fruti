import React from 'react';
import Style from './Login.scss';
import Main from '../Main/Main.jsx';
import { hashHistory } from 'react-router';
import $ from 'jquery';


export default class Login extends React.Component{

  constructor(){
    super();
  }


  handleLogIn(e){

    if(e.type == 'click' || (e.type = 'keyup' && e.which == 13)){
      let username = document.getElementById('iUser');
      if(username.value != '')
      {
        let usedNames = this.getUsernames();
        if(usedNames.indexOf(username.value) != -1){
            alert('That username is alredy in use, please select another');
        }
        else{
          window.sessionStorage.setItem('username',username.value);
          hashHistory.push("/Main");
        }
      }
      else {
        username.style.backgroundColor = 'rgba(255,0,0,0.4)';
      }
    }
  }

  getUsernames(){
    var names = [];
    $.ajax({
            url: 'http://localhost:3000/getUsernames',
            success: (res,status)=>{
              names =  res;
            },
            beforeSend:function(){
              console.log('getting usernames');
            },
            error:function(jqXHR,textStatus,Thrown){
              console.log("error",textStatus,Thrown,jqXHR);
            },
            async: false
          });

      return names;
  }

  render(){
    return(
      <div className="login">
        <div className="login-form">
          <div className="login-form-data">
            <h2 className="">Pick a name</h2>
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
