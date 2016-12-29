import React from "react";
import { IndexRoute , Router , Route , hashHistory } from 'react-router';

import Style from './Layout.css';

import Login from '../Login/Login.jsx';
import Main from  "../Main/Main.jsx";
import RoomList from  "../RoomList/RoomList.jsx";
import Game from  "../Game/Game.jsx";
import Round from  "../Round/Round.jsx";
import Points from  "../Points/Points.jsx";

export default class Layout extends React.Component{

  render(){
    return(
    <Router history={hashHistory}>
      <Route path="/" component={Login}></Route>
      <Route path="/Main" component={Main}>
        <IndexRoute component={RoomList}></IndexRoute>
        <Route path="/RoomList" component={RoomList}></Route>
        <Route path="/Game" component={Game}>
          <IndexRoute component={Round}></IndexRoute>
          <Route path="/Round" component={Round}></Route>
          <Route path="/Points" component={Points}></Route>
        </Route>
      </Route>
    </Router>
    );
  }

}
