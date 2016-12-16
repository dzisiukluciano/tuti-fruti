import React from 'react';

export default class AddQuery extends React.Component{

  render(){
    return(
      <div className="newQuery">
          <div className="addquery-div-btnclose">
            <button className="buttonClose" onClick={this.props.close}>&times;</button>
          </div>
          <div className="addquery-form">
            <div className="question">
              <div className="comment-card">
                <input className="comment-input-edit" ref="newQuestion" type="text" placeholder='enter a question'/>
              </div>
            </div>
            <div className="options">
              <div className="option">
                <div class="option-edit-one">
                  <input className="comment-input-edit" ref="newOptionOne" type="text" placeholder='enter an option'/>
                </div>
              </div>
              <div className="option">
                <div class="option-edit-two">
                  <input className="comment-input-edit" ref="newOptionTwo" type="text" placeholder='enter an option'/>
                </div>
              </div>
            </div>
          </div>
          <div className="addquery-btn-save">
            <button className="btn btn-success">SAVE</button>
          </div>
      </div>
    );
  }

}
