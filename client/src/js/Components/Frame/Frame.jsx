import React from 'react';
import Style from './Frame.scss';
import Footer from '../Footer/Footer.jsx';
import { hashHistory } from 'react-router';

export default class Frame extends React.Component{


  constructor(){
    super();
  }

  render(){
    return(
      <div className="frame">
        <article className="frame-children">
          {this.props.children}
        </article>
        <div className="frame-footer">
          <Footer/>
        </div>
      </div>
    );
  }
}
