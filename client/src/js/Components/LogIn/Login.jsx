import React from 'react';
import Style from './Login.css';

export default class Login extends React.Component{

  render(){
    return(
      <div className="login">
        <div className="login-form">
          <div className="login-form-data">
            <h2 class="login-form-data-h2">Pick a name</h2>
          </div>
          <div className="login-form-data">
            <input className="login-form-data-input" type="text"></input>
          </div>
          <div className="login-form-data">
            <button className="login-form-data-button" type="button"><strong>GO WITH IT</strong></button>
          </div>
        </div>
      </div>
    )
  }
}
