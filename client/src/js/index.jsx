import React from "react";
import ReactDOM from "react-dom";
import { Router , Route , Link , hashHistory } from 'react-router';

import Layout from "./Components/Layout/Layout.jsx";
import RoomList from  "./Components/RoomList/RoomList.jsx"

const app = document.getElementById('app');
ReactDOM.render(
  <Router history={hashHistory} >
    <Route path="/" component={ Layout }/>
    <Route path="/RoomList" component={ RoomList }/>
  </Router>
  ,app);
