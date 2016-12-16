import React from 'react';
import Button from './Button.jsx';
// var div;
export default class Comment extends React.Component{
  constructor(){
    super();
    this.handleEditClick = this.handleEditClick.bind(this);
    this.decirHola = this.decirHola.bind(this);
    this.state = {
      edit : false
    };
  }

  componentDidMount() {
    console.log('YA ESTOY LISTO');
  }

  voteOneClick(){
    this.props.voteOneHandler(this.props.index);
  }

  voteTwoClick(){
    this.props.voteTwoHandler(this.props.index);
  }

  handleEditClick(e){
      this.setState({
        edit:true
      });
  }

  handleSaveClick(e){
      this.setState({
        edit:false
      });

      let newQuestion = this.refs.newQuestion.value;
      let newOptionOne = this.refs.newOptionOne.value;
      let newOptionTwo = this.refs.newOptionTwo.value;

      this.props.editQuery(this.props.index,newQuestion,newOptionOne,newOptionTwo);
  }

  decirHola() {
      console.log('Hola');
      console.log('THIS',this);
  }

  renderVoteState() {
    let questionComponent;
  if (this.state.edit) {
      questionComponent= (<input className="comment-input-edit" ref="newQuestion" type="text" defaultValue={this.props.question}/>);
    } else {
      questionComponent= (<span>{this.props.question}</span>);
    }

    return(
      <div className="full">
        <div className="question">
          <div className="comment-card">
            <div className="comment-div-edit">
              <button className="btn btn-default" onClick={this.handleEditClick}>edit</button>
            </div>
            { questionComponent }
          </div>
        </div>
        <div className="options">
          <div className="option">
            <button class="btn btn-danger option" onClick={this.voteOneClick.bind(this)}>
              {this.props.optionOne}
              // <span>{this.props.totalOneVotes}</span>
            </button>
          </div>
          <div className="option">
            <button class="btn btn-success option" onClick={this.voteTwoClick.bind(this)}>
              <p>{this.props.optionTwo}</p>
              // <span>{this.props.totalTwoVotes}</span>
            </button>
          </div>
        </div>
      </div>
      );
  }

  render(){
       return(
         <div>
           { this.renderVoteState() }
           <Button value="test" background="red" onClick={this.decirHola}/>
         </div>
       )
  };
}
