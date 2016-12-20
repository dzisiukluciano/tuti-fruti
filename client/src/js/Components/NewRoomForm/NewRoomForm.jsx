import React from 'react';
import Style from './NewRoomForm.css';

export default class NewRoomForm extends React.Component{

  close(){
    this.props.close();
  }

  render(){
    return(
      <div className="newRoomForm">
        <div className="newRoomForm-form">
          <div className="newRoomForm-form-close">
            <button className="newRoomForm-form-close-btn" onClick={this.close.bind(this)}><strong>&times;</strong></button>
          </div>
          <div id="roomName-input" className="newRoomForm-form-data">
            <div className="newRoomForm-form-data-row">
              <label className="newRoomForm-form-data-row-label">Name</label>
              <input className="newRoomForm-form-data-row-input" type="text">
              </input>
            </div>
            <div className="newRoomForm-form-data-row">
              <label className="newRoomForm-form-data-row-label">Max players</label>
              <select>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="newRoomForm-form-data-row">
              <button className="newRoomForm-form-data-row-btn">Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
