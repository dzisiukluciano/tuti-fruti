import React from 'react';
import Style from './Footer.scss';

export default class Footer extends React.Component{


  constructor(){
    super();
  }

  render(){
    return(
      <div className="footer">
        <a href="http://github.com/sebastiangon/tuti-fruti" target="_blank">
          <img className="repo-icon"/>
        </a>
      </div>
    );
  }
}
