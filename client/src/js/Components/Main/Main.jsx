import React from 'react';
import Style from './Main.scss';
import Game from '../Game/Game.jsx';
import RoomList from '../RoomList/RoomList.jsx';
import { hashHistory } from 'react-router';

export default class Main extends React.Component{


  constructor(){
    super();
  }

  render(){
    return(
      <div className="main">
        <div className="container">
          <p className="regular main-text">
            If your friends are playing...
          </p>
          <label className="label-action">Join game</label>
        </div>
        <div className="container">
          <p className="regular main-text">
            Invite your friends...
          </p>
          <label className="label-action">Create game</label>
        </div>
      </div>
    );
  }
}
