import React from 'react';
import Style from './NewRoomForm.css';
import $ from 'jquery';

export default class NewRoomForm extends React.Component{

  constructor(){
    super();

    this.state = {
      categories : []
    }
  }

  loadCategories(msg){
    this.setState({
      categories : msg.categories
    });
  }

  componentDidMount(){
    var self = this;

    this.props.socket.on('onCategoriesReceibed',self.loadCategories.bind(self));

    this.props.socket.emit('getCategories',{});
  }

  componentWillUnmount() {
    var self = this;
    this.props.socket.off('onCategoriesReceibed');
  }

  renderCategories(){
    if(this.state.categories.length > 0)
    {
      var categories_array = this.state.categories;
       return categories_array.map(function(item,i){
        return (
          <div className="categorie">
            <input type="checkbox" key={i} index={i} value={item}/>{item}
          </div>
        );
      });
    }
  }

  handleChange(){
    var allCheck = document.getElementById('cbAll');
    var categoriesCheckboxes = document.getElementById("categoriesList").getElementsByTagName("input");
    for(var i=0;i < categoriesCheckboxes.length; i++){
      categoriesCheckboxes[i].checked = allCheck.checked;
    }
  }

  handleClick(e){
    let room = null;
    let name = document.getElementById('iName').value;
    let maxPlayers = document.getElementById('iPlayers').value;
    let maxRounds = document.getElementById('iRounds').value;
    let categories = [];

    var categoriesCheckboxes = document.getElementById("categoriesList").getElementsByTagName("input");
    for(var i=0;i < categoriesCheckboxes.length; i++){
      let currentCheck = categoriesCheckboxes[i];
      if(currentCheck.checked){
        categories.push(currentCheck.value);
      }
    }

    let validated = true;
    if(name.trim() == ''){validated=false;alert("Pick a name for the room");}
    if(categories.length < 3){validated = false;alert("You must select at least 3 categories");}

    if(validated)
    {
        room = {
        name: name,
        maxPlayers: maxPlayers,
        categories: categories,
        maxRounds : maxRounds,
        players : [],
        admin : sessionStorage.getItem('username'),
    }

    this.props.enterRoom(room);
    }
  }

  render(){
    return(
      <div className="newRoomForm">
        <div className="form-line">
          <div className="form-label">
              <label>Name</label>
          </div>
          <div className="form-input">
              <input id='iName' className="form-text-input" type="text"></input>
          </div>
        </div>
        <div className="form-line">
          <div className="form-label">
              <label>Max players</label>
          </div>
          <div className="form-input">
            <div className="combo-style">
              <select id='iPlayers'>
                  <option key={1} value="2">2</option>
                  <option key={2} value="3">3</option>
                  <option key={3} value="4">4</option>
                  <option key={4} value="5">5</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-line">
            <div className="form-label">
                <label>Max rounds</label>
            </div>
            <div className="form-input">
              <div className="combo-style">
              <select id='iRounds'>
                  <option key={1} value="10">10</option>
                  <option key={2} value="11">11</option>
                  <option key={3} value="12">12</option>
                  <option key={4} value="13">13</option>
                  <option key={5} value="14">14</option>
                  <option key={6} value="15">15</option>
              </select>
            </div>
            </div>
        </div>
        <div className="form-line">
            <div className="form-label">
                <label>Categories</label>
            </div>
            <div id="categoriesList" className="categoriesList">
                {this.renderCategories()}
            </div>
            <div className="allCategories">
              <input id='cbAll' type="checkbox" onChange={this.handleChange.bind(this)} />
              <label for="cbAll">All</label>
            </div>
        </div>
        <div className="form-line">
          <div className="form-submit">
              <button className="form-submit-btn" onClick={this.handleClick.bind(this)}>Be an Admin</button>
          </div>
        </div>
      </div>
    )
  }
}
