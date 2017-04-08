import React from "react";
import { IndexRoute , Router , Route , hashHistory } from 'react-router';

import Style from './Layout.scss';

import Frame from '../Frame/Frame.jsx';
import Presentation from '../Presentation/Presentation.jsx';
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

  render(){
    return(
    <Router history={hashHistory}>
      <Route path="/" component={Frame}>
        <IndexRoute component={Presentation}></IndexRoute>
        <Route path="/Presentation" component={Presentation}></Route>
        <Route path="/Login" component={() => (<Login socket= {this.props.socket} />)}></Route>
        <Route path="/Main" component={() => (<Main socket= {this.props.socket} />)}></Route>
      </Route>
    </Router>
    );
  }

/*
  render(){
    return(
    <Router history={hashHistory}>
      <Route path="/" component={Presentation}></Route>
      <Route path="/Login" component={() => (<Login socket= {this.props.socket} />)}></Route>
      <Route path="/Main" component={() => (<Main socket= {this.props.socket} />)}>
        <IndexRoute component={RoomList}></IndexRoute>
        <Route path="/RoomList" component={RoomList}></Route>
        <Route path="/Game" component={Game}></Route>
      </Route>
    </Router>
    );
  }*/

}
