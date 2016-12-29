import React from 'react';
import Style from './Main.css';
import Game from '../Game/Game.jsx';
import RoomList from '../RoomList/RoomList.jsx';

export default class Main extends React.Component{

  constructor(){
    super();

    let socket = io('http://192.168.10.198:3000');

    this.state = {
      socket : socket
    }
  }

  render(){

    var self = this;
    var childrenWithProps = React.Children.map(this.props.children, function(child) {
            return React.cloneElement(child, { socket: self.state.socket});
        });

    return(
      <div className="main-div">
        <div className='main-header'>
          Tuti-Fruti
        </div>
        <div className='main-body'>
          {childrenWithProps}
        </div>
      </div>
    );
  }
}
