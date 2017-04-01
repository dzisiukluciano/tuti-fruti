import React from 'react';
import Style from './Letter.css';

export default class Letter extends React.Component{

  static defaultProps = {
      fullAlphabet : 'abcdefghijklmnopqrstuvwxyz'.split(''),
  };

  constructor(props,defaultProps){
    super(props,defaultProps);
    this.state={
      timerId : null,
      displayLetter : null,
    }
  }

  componentDidMount(){
    var self = this;
    setTimeout(self.stop(),4000);
    self.spinRoullette();
  }

  stop(){
    clearTimeout(this.state.timerId);
    this.setState({
      displayLetter : this.props.letter,
    });
  }

  spinRoullette(){
    var self = this;

    let random = Math.floor(Math.random() * (self.props.fullAlphabet.length - 1 + 1)) + 1;
    let actualLetter = self.props.fullAlphabet[random];

    self.setState({
      displayLetter : actualLetter,
    })

    var timer = setTimeout(self.spinRoullette.bind(self),100);
    self.setState({
      timerId : timer,
    });
  }

  render(){
    return(
      <div className="letter-div">
        <div className="letter-roullette">
          {this.state.displayLetter}
        </div>
    </div>
    );
  }
}
