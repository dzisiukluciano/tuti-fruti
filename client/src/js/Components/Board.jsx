import React from 'react';
import Comment from './Comment.jsx';
import $ from 'jquery';
import styles from '../../Style/Board.css';

export default class Board extends React.Component{

  constructor(){
    super();
    this.state = {
      queries : [
        {
          question:'Fuiste al IMAX ?',
          optionOne:'Mas Vale !',
          optionTwo:'Eso se come ?',
          voteOne : 0,
          voteTwo : 0
        },
        {
          question:'Have you seen World War Z ?',
          optionOne:'yes',
          optionTwo:'No',
          voteOne : 0,
          voteTwo : 0
        },
        {
          question:'Mate',
          optionOne:'Amargo',
          optionTwo:'Dulce',
          voteOne : 0,
          voteTwo : 0
        },
        {
          question:'Te gusta el mondongo ?',
          optionOne:'Esta bueno para secarse',
          optionTwo:'Delicia',
          voteOne : 0,
          voteTwo : 0
        }
      ],
      actual : 0
    };
  };

  renderComment(i){
    return(
      <Comment key={i}
              index={i}
              question={this.state.queries[i].question}
              optionOne={this.state.queries[i].optionOne}
              optionTwo={this.state.queries[i].optionTwo}
              voteOneHandler = {this.voteOne.bind(this)}
              voteTwoHandler = {this.voteTwo.bind(this)}
              editQuery = {this.editQuery.bind(this)}
              totalOneVotes = {this.state.queries[i].voteOne}
              totalTwoVotes = {this.state.queries[i].voteTwo}
               />
    );
  }

  voteOne(i){
    let queries = this.state.queries;
    var comment = queries[i];
    comment.voteOne = comment.voteOne + 1;
    this.setState({
      queries:queries
    });
  }

  voteTwo(i){
    let queries = this.state.queries;
    var comment = queries[i];
    comment.voteTwo = comment.voteTwo + 1;
    this.setState({
      queries:queries
    });
  }

  fetchNext(e){
    var next = this.state.actual + 1;
    if(next <= this.state.queries.length - 1){
      $('.main-board').fadeOut(0);
      let queries = this.state.queries;
      this.setState({
        queries:queries,
        actual:next
      });
    }
  }

  fetchPrev(e){
    var prev = this.state.actual - 1;
    if(prev >= 0){
      $('.main-board').fadeOut(0);
      let queries = this.state.queries;
      this.setState({
        queries:queries,
        actual:prev
      });
    }
  }

  editQuery(i,newQuestion,newOptionOne,newOptionTwo){
    let modifiedQuery = this.state.queries[i];

    modifiedQuery.question = newQuestion;
    modifiedQuery.optionOne = newOptionOne;
    modifiedQuery.optionTwo = newOptionTwo;

    let queries = this.state.queries;
    queries[i] = modifiedQuery;

    this.setState({
      queries : queries
    });
  }



  render(){
    $('.main-board').fadeIn(1000);
    return (
        <div className="no-header">
          <div className="main-board">
            {this.renderComment(this.state.actual)}
          </div>
          <div className="footer">
            <button type="button" onClick={this.fetchPrev.bind(this)} class="btn btn-primary fetch">← Previous</button>
            <button type="button" onClick={this.props.newQuery} class="add">+</button>
            <button type="button" onClick={this.fetchNext.bind(this)} class="btn btn-primary fetch">Next →</button>
        </div>
      </div>
    );
  };
}
