import React from "react";
import AddQuery from './AddQuery.jsx'
import Board from './Board.jsx';
import Header from './Header.jsx';

export default class Layout extends React.Component{

  constructor(){
    super();
    this.state = {
      newQuery : false
    }
  }

  newQuery(){
    this.setState({
      newQuery:true
    });
  }

  closeNewQuery(){
    this.setState({
      newQuery:false
    });
  }

  newQueryForm(renderNewQuery){
    if(renderNewQuery)
    {
      return(<AddQuery close={this.closeNewQuery.bind(this)}/>);
    }
    else
      return;

  }

  render(){
    return(
      <div className='full'>
        {this.newQueryForm(this.state.newQuery)}
        <Header />
        <Board newQuery={this.newQuery.bind(this)} />
      </div>
    );
  }

}
