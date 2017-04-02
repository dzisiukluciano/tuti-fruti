import React from "react";
import { IndexRoute , Router , Route , hashHistory } from 'react-router';

import Style from './Layout.css';

import Login from '../Login/Login.jsx';
import Main from  "../Main/Main.jsx";
import RoomList from  "../RoomList/RoomList.jsx";
import Game from  "../Game/Game.jsx";
import Round from  "../Round/Round.jsx";
import Points from  "../Points/Points.jsx";

import Config from '../../../../config/config.js';
import SocketIOClient from 'socket.io-client';

export default class Layout extends React.Component{

  static defaultProps = {
      socket : SocketIOClient('http://'+ Config.server.host + ':' + Config.server.port.port ),
  };

  constructor(props,defaultProps){
    super(props,defaultProps);
  };


  componentDidMount(){
  }

  componentWillUnmount(){
  };


  render(){
    return(
    <Router history={hashHistory}>
      <Route path="/" component={() => (<Login socket= {this.props.socket} />)}></Route>
      <Route path="/Main" component={Main}>
        <IndexRoute component={RoomList}></IndexRoute>
        <Route path="/RoomList" component={RoomList}></Route>
        <Route path="/Game" component={Game}></Route>
      </Route>
    </Router>
    );
  }

}
