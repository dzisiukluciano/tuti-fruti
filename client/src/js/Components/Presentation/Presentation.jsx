import React from 'react';
import Style from './Presentation.scss';

import { hashHistory } from 'react-router';

export default class Presentation extends React.Component{

  constructor(){
    super();
  }

  handleClick(){
    hashHistory.push("/Login");
  }

  render(){
    return(
      <div className="presentation">
        <div className="presentation-title">
          <h1 className="black title">Tuti Fruti</h1>
        </div>
        <div className="presentation-container">
          <div>
            <p className="regular text background-blue">
            Wanna have some fun with your friends or family... ?
            You're in the right place, we have brought the traditional tuti fruti game to the web
            </p>
            <p className="black text">
            Easy to play, no need to register
            </p>
          </div>
          <div className="button-down">
            <p className="black text">
              Just push...
            </p>
            <button onClick={this.handleClick} className="regular button-play">Play</button>
          </div>
        </div>
      </div>
    );
  }
}
